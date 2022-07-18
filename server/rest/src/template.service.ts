import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import shelljs from 'shelljs';
import { v4 as createUuid } from 'uuid';
import type { TemplatePackage } from '@leya-print/common-api';
import { StorageService } from './storage/storage.service';
import { CrudService } from './storage/crud.service';

type StoredTemplatePackage = TemplatePackage & Required<Pick<TemplatePackage, 'id'>>;
export class TemplateService {
  private _dataStore: CrudService<StoredTemplatePackage, TemplatePackage>;

  constructor(
    storage: StorageService,
  ) {
    this._dataStore = new CrudService(storage, 'template-packages', (id, tpl) => ({ id, ...tpl }));
  }

  addTemplate(buffer: Buffer) {
    const id = createUuid();

    return new Promise((resolve, reject) => {
      const tmpFoler = path.join(process.cwd(), `tmp/${id}`);
      fs.mkdirSync(tmpFoler, { recursive: true });
      fs.writeFileSync(path.join(tmpFoler, 'packed.tgz'), buffer);
      shelljs.exec('tar zxvf packed.tgz', {
        cwd: tmpFoler,
        async: true,
      }, async (code, _stdout, stderr) => {
        try {
          if (code !== 0) return reject(stderr);

          const extractedDirname = fs.readdirSync(tmpFoler)
            .map((entry) => path.join(tmpFoler, entry))
            .find((entry) => fs.statSync(entry).isDirectory())
            ;
          if (!extractedDirname) {
            throw new Error('could not find extracted files');
          }

          const packageJson = JSON.parse(fs.readFileSync(path.join(extractedDirname, 'package.json'), 'utf-8'));
          const mainFilename = packageJson.main;

          const uploadedModule = await import(path.join(extractedDirname, mainFilename));
          const templatePackageData: TemplatePackage = uploadedModule.templatePackage;
          if (!templatePackageData) {
            throw new Error('no template package description found! Uploaded template has to export a const templatePackage of type TemplatePackage');
          }

          const templatePackage = this._dataStore.create(templatePackageData);

          return resolve(templatePackage);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
