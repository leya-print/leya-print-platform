// import { TemplateInfo, TemplatePackage } from '@leya-print/template-api';
import { TemplateInfo, TemplatePackage } from '/workspace/leya-print/common/template-api/types';
import { env } from './env';

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

   /**
   * meta information about template package
   * 
   * @param tplPackage 
   * @returns TemplatePackage object
   */
   async templatePackageInfo(tplPackage: string | undefined): Promise<TemplatePackage | undefined> {

    const tplBaseUrl = await this._tplBaseUrl(tplPackage);

    try {
      const templatePackage: TemplatePackage = tplPackage.startsWith('http')
        ? (await import(tplBaseUrl)).templatePackage
        : (await import(`${tplBaseUrl}/index${tplPackage ? '.js' : '.esm.js'}`)).templatePackage
      ;

      return templatePackage
    } catch (e) {
      console.warn('could not load template info', e);
    }
  }

  async defineCustomElements(tplPackage?: string) {
    const tplBaseUrl = await this._tplBaseUrl(tplPackage);
    const templatePackage: TemplatePackage = await this.templatePackageInfo(tplPackage)

    // in prod or dev Stencil calls it loader.js always -> look at lit to make it called loader.js as well
    try {
      const loader = await import(tplPackage ? `${tplBaseUrl}/${templatePackage.templatesLoaderPath}`  : `${tplBaseUrl}/loader.js`);
      loader.defineCustomElements?.();
    } catch (error) {
      const loader = await import(`${tplBaseUrl}/loader.js`);
      loader.defineCustomElements?.();
    }
  }

  private async _tplBaseUrl(tplPackage?: string) {
    const { templateServiceBaseUrl, templateBaseUrl } = await env;
    return tplPackage ? `${templateServiceBaseUrl}/tpl-contents/${tplPackage}` : `${templateBaseUrl}/build`;
  }
}

export const templatePackageService = new TemplatePackageService();
