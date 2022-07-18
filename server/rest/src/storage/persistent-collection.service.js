// @ts-check
"use strict";

const { clone } = require('merge');
const { PersistentItemService } = require('./persistent-item.service');

/**
 * @typedef {import('../storage/storage.service').StorageService} StorageService
 */

/**
 * @template {number|string} T
 */
class PersistentCollectionService {
  /**
   * @typedef {import('./persistent-item.service').PersistentItem<T[]>} PersistentTs
   */
  /** @type {PersistentTs} */
  #data;

  /**
   * @param {StorageService} storage
   * @param {string} ident
   * @param {T} _sample
   */
  constructor(storage, ident, _sample) {
    this.#data = new PersistentItemService(storage, ident, () => []);
  }

  /**
   * @param {T} item
   * @return {Promise<void>}
   */
  async push(item) {
    const data = await this.#data.load();
    data.push(clone(item));
    await this.#data.save(data);
  }

  /**
   * @param {(item: T) => boolean} filterFn to select items to remove
   * @return {Promise<T[]>} removed items
   */
  async remove(filterFn) {
    const origData = await this.#data.load();
    const { removed, remaining } = origData.reduce((sorted, next) => {
      if (filterFn(next)) {
        sorted.removed.push(next);
      } else {
        sorted.remaining.push(next);
      }
      return sorted;
    }, { removed: [], remaining: [] });
    await this.#data.save(remaining);
    return removed;
  }

  /**
   * @return {Promise<T[]>}
   */
  async toArray() {
    const data = await this.#data.reloadItem();
    return data.map(clone);
  }

  async drop() {
    return await this.#data.drop();
  }

  /**
   * @param {T} item
   * @returns {Promise<boolean>}  
   */
  async includes(item) {
    const data = await this.#data.load();
    return data.includes(item);
  }
}

// @ts

/**
 * @template {number|string} T
 * @typedef {PersistentCollectionService<T>} PersistentCollection
 */

module.exports = { PersistentCollectionService };
