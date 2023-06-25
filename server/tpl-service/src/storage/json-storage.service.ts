import fs from 'fs';
import { clone } from 'merge';
import path from 'path';
import { StorageService, StorageItemDescription } from './storage.service';

export class JsonStorageService implements StorageService {
  constructor(
    private _baseFolder: string,
  ) {}

  async load<T>(descriptor: StorageItemDescription<T>): Promise<T> {
    const existing = await this._tryLoadExisting<T>(descriptor.ident);
    if (typeof existing !== 'undefined') {
      return existing;
    } else {
      const fallback = await descriptor.createDefault();
      return clone(fallback);
    }
  }

  async _tryLoadExisting<T>(ident: string): Promise<T | undefined> {
    try {
      return this._loadExisting(ident);
    } catch (e) {
      return undefined;
    }
  }

  private _loadExisting<T>(ident: string): T {
    const filename = this._filenameOf(ident);
    const contents = fs.readFileSync(filename, 'utf-8');
    if (/^[\{\["]/.test(contents)) {
      return JSON.parse(contents);
    } else /* istanbul ignore else: file system error? */ if (contents.match(/^\-?[0-9]+(\.[0-9]+)?$/)) {
      return parseFloat(contents) as any;
    } else {
      throw new Error('unparsable file contents');
    }
  }

  private _filenameOf(ident: string) {
    return path.resolve(__dirname, this._baseFolder, `${ident}.json`);
  }

  async save<T>(ident: string, data: T): Promise<T> {
    if (data === undefined) {
      throw new Error(`no data (${typeof data})`);
    }
    const filename = this._filenameOf(ident);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    return this._loadExisting(ident);
  }

  async drop<T>(ident: string): Promise<T | undefined> {
    const filename = this._filenameOf(ident);

    /** @type {T|undefined} */
    let deletedItem = undefined;

    try {
      deletedItem = this._loadExisting(ident);
    } catch (e) {
      return undefined;
    }
    fs.unlinkSync(filename);

    return clone(deletedItem) as T;
  }
}

module.exports = { JsonStorageService };
