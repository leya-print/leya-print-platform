const { SignPdf } = require('node-signpdf');
const { findByteRange, plainAddPlaceholder } = require('node-signpdf/dist/helpers')
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

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
        const certInfo = this.getCertificateInfo(certificateId);  
        
        if(certInfo === undefined || certInfo === null) return;

        const cert = this.getCertificate(certificateId, certInfo.p12);    
        const certPrivateKey = await this.getCertificatePrivateKey(certificateId, certInfo.privateKey, certInfo.passphrase);

        const signOptions = {
          ...serviceParams, 
          passphrase: certInfo.passphrase,
          signatureLength: 8192,
          cryptoKey: certPrivateKey,          
        };           
        
        const signedPdf = signPdf.sign(signablePdfBuffer, cert, signOptions);  
    
        return signedPdf;
      } catch (error) {
        console.error(error);
      }
    })();

      return await response;
    }
  
    getCertificate(certificateId: string, p12Path: string) {   
      const certPath = path.join(__dirname, this._certificatesPath, certificateId, p12Path);      
      const cert = fs.readFileSync(certPath);

      return cert;
    }

    getCertificateInfo(certificateId: string): ICertificateInfo {   
      const certPath = path.join(__dirname, this._certificatesPath, certificateId, certificateId + '.json');  
      const certInfo: ICertificateInfo = JSON.parse(fs.readFileSync(certPath, 'utf8'));

      return certInfo;
    }
  
    async getCertificatePrivateKey(certificateId: string, privateKeyPath: string, passphrase: string) {   
      const certPath = path.join(__dirname, this._certificatesPath, certificateId, privateKeyPath);      
      
      const privateKey = {
        key: fs.readFileSync(certPath, 'utf8'),
        passphrase: passphrase
      };          
    
      return await crypto.createPrivateKey(privateKey);                
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

  
  /**
   * @interface for certificate info
   */
  interface ICertificateInfo {
    certificateId: string;
    passphrase: string;
    p12: string;
    privateKey: string;
  }
    