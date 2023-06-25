import { chromium } from 'playwright';
const { SignPdf } = require('node-signpdf');
const { findByteRange, plainAddPlaceholder } = require('node-signpdf/dist/helpers')
const fs = require('fs');
const crypto = require('crypto');

export type PageActions<R> = (page: import('playwright').Page) => Promise<R>;

export class PdfFactory {

  constructor(
    private _baseUrl: string,
  ) {}

  get browser() {
    const browserPromise = chromium.launch();
    Object.defineProperty(this, 'browser', { value: browserPromise, writable: false });

    return browserPromise;
  }

  async openPage<R>(templateId: string, pagePart: string, queryParams: {[key: string]: string}, providedData: string | undefined, actions: PageActions<R>) {

    console.log('open Page:', templateId, pagePart, queryParams, providedData);
    console.log('_baseUrl', this._baseUrl);

    const urlWithParams = new URL(`${this._baseUrl}/${templateId}/${pagePart}`);
    
    Object.entries(queryParams).forEach(([key, value]) => urlWithParams.searchParams.set(key, value));

    try {      
      const browser = await this.browser;
      const context = await browser.newContext();

      const page = await context.newPage();
  
      page.on('console', (consoleMessage) => console.log({ type: consoleMessage.type(), text: consoleMessage.text() }));
      page.on('requestfailed', (request) => console.error('request failed: ' + request.url()));
      
      let urlStr = String(urlWithParams);
      
      console.log('open urlStr: ' + urlStr);
      console.log('data: ' + JSON.stringify(providedData, null, 2));

      await Promise.all([
        page.goto(urlStr),
        page.waitForURL(urlStr, { timeout: 30000}).then(async () => {  
  
        if (providedData) {
          await page.evaluate((data) => {
            (window as any).providedData = JSON.parse(data);
            return Promise.resolve(true);
          }, providedData);
        }
        }),
        page.waitForSelector('app-root'),
        
      ]);
  
      const result = await actions(page);
      await context.close();

      return result;

    } catch (error) {
      console.log('error while getting page:');
      console.error(error);
    }
  }

  async create(templateId: string, queryParams: {[key: string]: any}, providedData?: string) {
    const openPage = <R>(pagePart: string, actions: PageActions<R>) => this.openPage(templateId, pagePart, queryParams, providedData, actions);
    const [header, footer] = await Promise.all(
      ['header', 'footer'].map((pagePart) => openPage(pagePart, async (page) => {
        const styles = await page.$$('style');
        const stylesHtml = `<style>\n${(await Promise.all(styles.map(async (next) => {
          const styleText = await next.innerHTML();
          return styleText;
        }))).join('\n\n')}\n</style>`;
        const appRoot = page.locator('app-root');
        const appRootHtml = await appRoot.innerHTML();
        const boundingBox = await appRoot.boundingBox();
        const boundingBoxHeight = boundingBox && boundingBox.height;

        const html = stylesHtml + appRootHtml;
        const height = boundingBoxHeight ? boundingBoxHeight + 'px' : '0';
        return { height, html };
      })),
    );

    if (header === undefined || footer === undefined) return;

    const pdf = await openPage('content', async (page) => page.pdf({
      headerTemplate: header.html,
      footerTemplate: footer.html,
      displayHeaderFooter: true,
      printBackground: true,
      format: 'A4',
      margin: {
        top: header.height,
        bottom: footer.height,
        left: 0,
        right: 0,
      },

    }));

    return pdf;
  }

  async signPdf(pdfName: string, pdf: Buffer) {      
    const privateKey = {
      key: fs.readFileSync('src/key.pem', 'utf8'),
      passphrase: '12345'
    };

    const cert = fs.readFileSync('src/cert.p12');

    const serviceParams = {
      reason: 'Ensure no further changes',
      name: 'Max Sample',
      location: 'Musterhausen, Germany',
      contactInfo: 'max.sample@leya-it-solutions.de',
    }
  
    const signablePdfBuffer = isSignable(pdf) ? pdf : plainAddPlaceholder({
      pdfBuffer: pdf,
      reason: serviceParams.reason,
      contactInfo: serviceParams.contactInfo,
      name: serviceParams.name,
      location: serviceParams.location,
    });
  
    const signPdf = new SignPdf();

    (async () => {
      try {
        const privateKeyObj = await crypto.createPrivateKey(privateKey);
       
        const signOptions = {
          ...serviceParams,
          passphrase: '12345',
          signatureLength: 8192,
          cryptoKey: privateKeyObj,
        };        
     
        const signedPdf = signPdf.sign(signablePdfBuffer, cert, signOptions);
        fs.writeFileSync('temp/' + pdfName, signedPdf);        
    
        return signedPdf;
      } catch (error) {
        console.error(error);
      }
    })();
  }
}

  /**
 * 
 * @param {Buffer} pdf 
 */
  function isSignable(origPdfBuffer: any) {
    try {
      findByteRange(origPdfBuffer);
      return true;
    } catch (e) {
      return false;
    }
  }