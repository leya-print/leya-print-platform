// @ts-check
'use strict';

const fs = require('fs');
const { clone } = require('merge');
const path = require('path');

/** @typedef { import('./storage.service').StorageService } StorageService */
/**
 * @typedef { import('./storage.service').StorageItemDescription<T> } StorageItemDescription<T>
 * @template {{}} T
 * */

/**
 * @implements {StorageService}
 */
class JsonStorageService {
  /** @type {string} */
  _baseFolder;

  /**
   * @param {string} _baseFolder 
   */
  constructor(
    _baseFolder,
  ) {
    this._baseFolder = _baseFolder;
  }
  /**
   * @template T
   * @param { StorageItemDescription<T> } descriptor 
   */
  async load(descriptor) {
    const existing = this._tryLoadExisting(descriptor.ident);
    if (existing) {
      return existing;
    } else {
      const fallback = await descriptor.createDefault();
      return clone(fallback);
    }
  }

  /**
   * @param { string } ident 
   * @returns Promise<T | undefined>
   */
  _tryLoadExisting(ident) {
    try {
      return this._loadExisting(ident);
    } catch (e) {
      return undefined;
    }
  }

  /**
   * @param { string } ident 
   * @returns T
   */
  _loadExisting(ident) {
    const filename = this._filenameOf(ident);
    const contents = fs.readFileSync(filename, 'utf-8');
    if (/^[\{\["]/.test(contents)) {
      return JSON.parse(contents);
    } else /* istanbul ignore else: file system error? */ if (contents.match(/^\-?[0-9]+(\.[0-9]+)?$/)) {
      return parseFloat(contents);
    } else {
      throw new Error('unparsable file contents');
    }
  }

  /**
   * @param {string} ident 
   */
  _filenameOf(ident) {
    return path.resolve(__dirname, this._baseFolder, `${ident}.json`);
  }

  /**
   * @template {{}} T
   * @param {string} ident 
   * @param {T} data 
   */
  async save(ident, data) {
    if (data === undefined) {
      throw new Error(`no data (${typeof data})`);
    }
    fs.writeFileSync(this._filenameOf(ident), JSON.stringify(data, null, 2));
    return this._loadExisting(ident);
  }

  /**
   * @template {{}} T
   * @param {string} ident 
   */
  async drop(ident) {
    const filename = this._filenameOf(ident);

    /** @type {T|undefined} */
    let deletedItem = undefined;

    try {
      deletedItem = this._loadExisting(ident);
    } catch (e) {
      return undefined;
    }    
    fs.unlinkSync(filename);
    
    return clone(deletedItem);
  }
}

module.exports = { JsonStorageService };