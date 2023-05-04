import { TemplateInfo, TemplatePackage } from '@leya-print/common-api';
import { env } from '../../../global/env';

export class TemplatePackageService {
  async templateInfo(tplPackage: string | undefined, tplName: string): Promise<TemplateInfo | undefined> {
    const tplBaseUrl = await this._tplBaseUrl(tplPackage);
    try {
      const templatePackage: TemplatePackage = (await import(`${tplBaseUrl}/index${tplPackage ? '.js' : '.esm.js'}`)).templatePackage;
      const templateInfo = templatePackage.templates.find((tplInfo) => tplInfo.ident === tplName);
      return templateInfo
    } catch (e) {
      console.warn('could not load template info', e);
    }
  }

  async defineCustomElements(tplPackage?: string) {
    const tplBaseUrl = await this._tplBaseUrl(tplPackage);
    const loader = await import(tplPackage ? `${tplBaseUrl}/loader.js` : `${tplBaseUrl}/templates.esm.js`);
    loader.defineCustomElements?.();
  }

  private async _tplBaseUrl(tplPackage?: string) {
    const { templateServiceBaseUrl, templateBaseUrl } = await env;
    return tplPackage ? `${templateServiceBaseUrl}/tpl-contents/${tplPackage}` : `${templateBaseUrl}/build`;
  }
}

export const templatePackageService = new TemplatePackageService();
