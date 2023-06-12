import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import shelljs from 'shelljs';
import copy from 'recursive-copy';
import { v4 as createUuid } from 'uuid';
import type { TemplatePackage } from '@leya-print/common-api';
import { StorageService } from './storage/storage.service';
import { CrudService } from './storage/crud.service';

type StoredTemplatePackage = TemplatePackage & Required<Pick<TemplatePackage, 'id'>>;
export class TemplateService extends CrudService<StoredTemplatePackage, TemplatePackage> {
  constructor(
    storage: StorageService,
    public readonly tplRoot: string,
  ) {
    super(storage, 'template-packages', (id, tpl) => ({ id, ...tpl }));
  }

  addTemplate(buffer: Buffer) {
    const id = createUuid();

    return new Promise((resolve, reject) => {
      const tmpFolder = path.join(process.cwd(), `tmp/${id}`);
      fs.mkdirSync(tmpFolder, { recursive: true });
      fs.writeFileSync(path.join(tmpFolder, 'packed.tgz'), buffer);
      shelljs.exec('tar zxvf packed.tgz', {
        cwd: tmpFolder,
        async: true,
      }, async (code, _stdout, stderr) => {
        try {
          if (code !== 0) return reject(stderr);

          const extractedDirname = fs.readdirSync(tmpFolder)
            .map((entry) => path.join(tmpFolder, entry))
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

          const templatePackage = await this.create(templatePackageData);
          const srcFolder = path.join(extractedDirname, 'dist/esm');
          const dstFolder = path.join(this.tplRoot, templatePackage.id);
          await copy(srcFolder, dstFolder);

          return resolve(templatePackage);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
