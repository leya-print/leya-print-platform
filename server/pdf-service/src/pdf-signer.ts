const { SignPdf } = require('node-signpdf');
const { findByteRange, plainAddPlaceholder } = require('node-signpdf/dist/helpers')
const fs = require('fs');
const crypto = require('crypto');

export class PdfSigner {

  constructor(
    private _certificatesPath: string,
    ) {}
  
  async signPdf(certificateId: string, pdf: Buffer, serviceParams : IServiceParams) {   

    const signablePdfBuffer = isSignable(pdf) ? pdf : plainAddPlaceholder({
      pdfBuffer: pdf,
      reason: serviceParams.reason,
      contactInfo: serviceParams.contactInfo,
      name: serviceParams.name,        
      location: serviceParams.location,      
    });
  
    const signPdf = new SignPdf();

    const response = (async () => {
      try {          
        const cert = this.getCertificate(certificateId);    
        const certPrivateKey = await this.getCertificatePrivateKey(certificateId);

        const signOptions = {
          ...serviceParams, 
          passphrase: this.getCertificatePassphrase(certificateId),
          signatureLength: 8192,
          cryptoKey: certPrivateKey,          
        };           
        
        const signedPdf = signPdf.sign(signablePdfBuffer, cert, signOptions);
        console.log('signedPdf -- from pdf-signer', signedPdf);      
    
        return signedPdf;
      } catch (error) {
        console.error(error);
      }
    })();

      return await response;
    }
  
    getCertificate(certificateId: string) {                      
        // return fs.readFileSync(`src/${certificateId}.p12`);
        console.log(this._certificatesPath + ' - ' + certificateId);
        
        return fs.readFileSync(`/workspace/leya-print/server/container/root/leya-print/config/certificates/${certificateId}.p12`);
    }
  
    async getCertificatePrivateKey(certificateId: string) {      
      const privateKey = {
        key: fs.readFileSync(`/workspace/leya-print/server/container/root/leya-print/config/certificates/${certificateId}_key.pem`, 'utf8'),
        passphrase: this.getCertificatePassphrase(certificateId)
      };          
    
      return await crypto.createPrivateKey(privateKey);                
    }

    getCertificatePassphrase(certificateId: string) {      
      // TODO: get passphrase by certificate Id from JSON file or other means of storing passphrases
      if (certificateId === 'test') return '12345';
    
      return '12345';
    }
  }

  
  /**
   * @param {Buffer} origPdfBuffer 
   */
  function isSignable(origPdfBuffer: any) {
    try {
      findByteRange(origPdfBuffer);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * @interface for pdf service parameters
   */
  interface IServiceParams {
    reason?: string;
    name?: string;
    location?: string;
    contactInfo?: string;
  }
    