import { TemplateInfo, TemplatePackage } from '@leya-print/common-api';

export class TemplatePackageService {
  async templateInfo(tplPackage: string | undefined, tplName: string): Promise<TemplateInfo | undefined> {
    const tplBaseUrl = this._tplBaseUrl(tplPackage);
    try {
      const templatePackage: TemplatePackage = (await import(`${tplBaseUrl}/index${tplPackage ? '.js' : '.esm.js'}`)).templatePackage;
      const templateInfo = templatePackage.templates.find((tplInfo) => tplInfo.ident === tplName);
      return templateInfo
    } catch (e) {
      console.warn('could not load template info', e);
    }
  }

  async defineCustomElements(tplPackage?: string) {
    const tplBaseUrl = this._tplBaseUrl(tplPackage);
    const loader = await import(tplPackage ? `${tplBaseUrl}/loader.js` : `${tplBaseUrl}/templates.esm.js`);
    loader.defineCustomElements?.();
  }

  private _tplBaseUrl(tplPackage?: string) {
    return tplPackage ? `http://localhost:7001/tpl-contents/${tplPackage}` : `http://localhost:3333/build`;
  }
}

export const templatePackageService = new TemplatePackageService();
