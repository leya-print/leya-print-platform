import type { TemplatePackage } from '@leya-print/template-api';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { env } from './env';

export class TemplateService {

  private packages$b = new BehaviorSubject<TemplatePackage[] | false>(false);

  get packages$(): Observable<TemplatePackage[]> {
    return this._lazyInitPackages();
  }

  private _lazyInitPackages(): Observable<TemplatePackage[]> {
    const packages$ = this.packages$b.asObservable().pipe(
      filter((packages): packages is TemplatePackage[] => !!packages),
    );
    Object.defineProperty(this, 'packages$', {
      value: packages$,
      writable: false,
    });

    this._reloadPackages();
    return this.packages$;
  }

  private async _reloadPackages(): Promise<TemplatePackage[]> {
    this.packages$b.next(false);

    const templateServiceBaseUrl = (await env).templateServiceBaseUrl;

    const response = await fetch(`${templateServiceBaseUrl}/tpl/`);
    const packages = await response.json();

    this.packages$b.next(packages);
    return packages;
  }

  async addPackages(templatePackage: TemplatePackage[]) {
    const currentPackages = await firstValueFrom(this.packages$);
    const allPackages = currentPackages.concat(...templatePackage);
    this.packages$b.next(allPackages);
    return allPackages;
  }
}

export const templateService = new TemplateService();
