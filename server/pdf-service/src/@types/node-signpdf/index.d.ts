declare module 'node-signpdf' {
    export interface SignPdfOptions {
        asn1StrictParsing: boolean,
        passphrase: string,
    };
    export class SignPdf {
        sign(pdfBuffer: Buffer, p12Buffer: Buffer, additionalOptions: Partial<SignPdfOptions> = {}): Buffer;
    };
    export declare module 'dist/helpers' {
        export function findByteRange(pdf: Buffer): {
            byteRangePlaceholder,
            byteRangeStrings,
            byteRanges,
        };
    
        export function plainAddPlaceholder(inputs: {
            pdfBuffer: Buffer,
            reason?: string,
            contactInfo?: string,
            name?: string,
            location?: string,
            signatureLength?: number,
            subFilter?: string,
          }): Buffer;
    }
}

declare module 'node-signpdf/dist/helpers' {
    export function findByteRange(pdf: Buffer): {
        byteRangePlaceholder,
        byteRangeStrings,
        byteRanges,
    };

    export function plainAddPlaceholder(inputs: {
        pdfBuffer: Buffer,
        reason?: string,
        contactInfo?: string,
        name?: string,
        location?: string,
        signatureLength?: number,
        subFilter?: string,
      }): Buffer;
}