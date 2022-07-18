// @ts-check
'use strict';

/**
 * @typedef {import('./storage.service').StorageService} StorageService
 */

/**
 * @template T
 */
class PersistentItemService {
  /**
   * @typedef {import('./storage.service').StorageItemDescription<T>} StorageItemDescription
   */

  /**
   * @readonly
   * @type {StorageService}
   */
  _storage;

  /**
   * @readonly
   * @type {string}
   */
  _ident;

  /**
   * @readonly
   * @type {StorageItemDescription}
   */
  _descriptor;

  /**
   * 
   * @param {StorageService} storage 
   * @param {string} ident
   * @param {() => Promise<T> | T } createDefault
   */
  constructor(storage, ident, createDefault) {
    Object.defineProperty(this, '_storage', { value: storage, writable: false });
    Object.defineProperty(this, '_ident', { value: ident, writable: false });
    Object.defineProperty(this, '_descriptor', { value: { ident, createDefault }});
  }

  /**
   * @param {T} item
   * @returns {Promise<T>}
   */
  async save(item) {
    await this._storage.save(this._ident, item);
    return this.reloadItem();
  }

  /**
   * reload data from storage
   * 
   * @returns {Promise<T>}
   */
  async reloadItem() {
    const item = this._storage.load(this._descriptor);
//    this.load = () => item;
    return item;
  }

  /**
   * @returns {Promise<T>}
   */
  load() {
    return this.reloadItem();
  }

  /**
   * @return {Promise<T|undefined>}
   */
  async drop() {
    this.load = this.reloadItem.bind(this);
    return this._storage.drop(this._ident);
  }
}

/**
 * @template T
 * @typedef {PersistentItemService<T>} PersistentItem
 */

module.exports = { PersistentItemService };