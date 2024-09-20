import { TemplateInfo, TemplatePackage } from '@leya-print/template-api';
import { env } from '../env';

export class TemplatePackageServiceImpl {
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
        : (await import(`${tplBaseUrl}/` + await this.getEntryPointFile(tplBaseUrl))).templatePackage;      

      const templateInfo = templatePackage.templates.find((tplInfo) => tplInfo.ident === tplName);
      return templateInfo
    } catch (e) {
      console.log('could not load template info', e);
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
        : (await import(`${tplBaseUrl}/` + await this.getEntryPointFile(tplBaseUrl))).templatePackage;              

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
        ? await import(tplPackage.replace('index.esm.js', templatePackage.templatesLoaderPath ?? 'templates.esm.js'))
        : await import(tplPackage ? `${tplBaseUrl}/dist/esm/loader.js` : `${tplBaseUrl}/dist/esm/templates.esm.js`);

      loader.defineCustomElements?.();
    } catch (e) {
      console.warn('could not load template package info', e);
    }
  }

  private async _tplBaseUrl(tplPackage?: string) {
    const { templateServiceBaseUrl, templateBaseUrl } = await env;
    if (tplPackage != null && tplPackage.startsWith('http')) return tplPackage;

    return tplPackage ? `${templateServiceBaseUrl}/tpl-contents/${tplPackage}` : `${templateBaseUrl}/build`;
  }

  private async getEntryPointFile(tplBaseUrl) {
    const packageRequest = await fetch(tplBaseUrl + '/package.json');
    const packageData = await packageRequest.json();

    return packageData.module 
    ?? packageData.next 
    ?? packageData.es2022 
    ?? packageData.es2020 
    ?? packageData.es2017 
    ?? packageData.es2015 
    ?? packageData.main;
    
  }
}

export const templatePackageService = new TemplatePackageServiceImpl();
export type TemplatePackageService = typeof templatePackageService;