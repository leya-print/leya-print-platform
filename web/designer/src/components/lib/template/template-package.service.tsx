// import { TemplateInfo, TemplatePackage } from '@leya-print/template-api';
import { TemplateInfo, TemplatePackage } from '/workspace/leya-print/common/template-api/types';
import { env } from '../../../global/env';

export class TemplatePackageService {
  /**
   * meta information about templates
   * 
   * @param tplPackage 
   * @param tplName 
   * @returns 
   */
  async templateInfo(tplPackage: string | undefined, tplName: string): Promise<TemplateInfo | undefined> {

    const tplBaseUrl = await this._tplBaseUrl(tplPackage);

    try {
      const templatePackage: TemplatePackage = tplPackage.startsWith('http')
        ? (await import(tplBaseUrl)).templatePackage
        : (await import(`${tplBaseUrl}/index${tplPackage ? '.js' : '.esm.js'}`)).templatePackage
      ;
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

  /**
   * loads web components needed for the template
   * @param tplPackage 
   */
  async defineCustomElements(tplPackage?: string) {
    const tplBaseUrl = await this._tplBaseUrl(tplPackage);
    
    try {
      const templatePackage: TemplatePackage = await this.templatePackageInfo(tplPackage)

      const loader = tplPackage.startsWith('http')
        ? await import(tplPackage.replace('index.esm.js', templatePackage.templatesFilePath))
        : await import(tplPackage ? `${tplBaseUrl}/loader.js` : `${tplBaseUrl}/templates.esm.js`);

    loader.defineCustomElements?.();
    } catch (e) {
      console.warn('could not load template package info', e);
    }
  }

  private async _tplBaseUrl(tplPackage?: string) {
    const { templateServiceBaseUrl, templateBaseUrl } = await env;
    // here

    if (tplPackage != null && tplPackage.startsWith('http')) return tplPackage;

    return tplPackage ? `${templateServiceBaseUrl}/tpl-contents/${tplPackage}` : `${templateBaseUrl}/build`;
  }
}

export const templatePackageService = new TemplatePackageService();
