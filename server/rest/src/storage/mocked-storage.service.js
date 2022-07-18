// @ts-check
"use strict";

const { clone } = require('merge');

/** @typedef { import('../storage/storage.service').StorageService } StorageService */
/**
 * @typedef { import('../storage/storage.service').StorageItemDescription<T> } StorageItemDescription<T>
 * @template T
 * */

/**
 * @implements {StorageService}
 */
class MockedStorageService {
  multiStore = {};
  lastSavedItem;

  /**
   * @template T
   * @param { StorageItemDescription<T> } descriptor 
   * @returns Promise<T>
   */
  async load(descriptor) {
    const existing = this.multiStore[descriptor.ident];
    if (existing) {
      return clone(existing);
    }

    const created = await descriptor.createDefault();
    this.multiStore[descriptor.ident] = created;
    return clone(created);
  }

  /**
   * @template T
   * @param { string } ident
   * @param { T } data
   */
  async save(ident, data) {
    if (data === undefined) {
      throw new Error(`no data (${typeof data})`);
    }
    this.lastSavedItem = data;
    const clonedData = clone(data);
    this.multiStore[ident] = clonedData;
    return clonedData;
  }

  async drop(ident) {
    const droppedItem = this.multiStore[ident];
    delete this.multiStore[ident];
    return droppedItem;
  }
}

module.exports = { MockedStorageService };