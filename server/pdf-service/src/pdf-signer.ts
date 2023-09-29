import { CertificateInfo } from "./certificate-info.model";
import { ServiceParams } from "./service-params.model";
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

import { SignPdf } from 'node-signpdf';
import { findByteRange, plainAddPlaceholder } from 'node-signpdf/dist/helpers';

export class PdfSigner {

  constructor(
    private _certificatesPath: string,
  ) { }

  async signPdf(certificateId: string, pdf: Buffer, serviceParams: ServiceParams) {

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

        if (certInfo === undefined || certInfo === null) return;

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

  getCertificateInfo(certificateId: string): CertificateInfo {
    const certPath = path.join(__dirname, this._certificatesPath, certificateId, certificateId + '.json');
    const certInfo: CertificateInfo = JSON.parse(fs.readFileSync(certPath, 'utf8'));

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