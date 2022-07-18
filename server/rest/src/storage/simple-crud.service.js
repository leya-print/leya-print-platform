// @ts-check
'use strict';

const { PersistentItemService } = require('./persistent-item.service');

/**
 * @typedef {import('./storage.service').StorageService} StorageService
 */

const createUuid = require('uuid').v4;

/**
 * simple crud service for simple types
 * 
 * @template {string | number} T
 */
class SimpleCrudService {
  /**
   * @typedef {import('./storage.service').Indexed<T>} IndexedT
   * @typedef {import('./persistent-item.service').PersistentItem<IndexedT>} PersistentIndexedT
   * @typedef {import('./storage.service').StorageItemDescription<IndexedT>} StorageItemDescription
   */

  /**
   * @readonly
   * @type {PersistentIndexedT}
   *
   */
  _storage;

  /**
   * reload data from storage
   * 
   * @returns {Promise<IndexedT>}
   */
  reloadData() {
    return this._storage.reloadItem();
  }

  /**
   * @returns {Promise<IndexedT>}
   */
  _data() {
    return this._storage.load();
  }

  /**
   * 
   * @param {StorageService} storage 
   * @param {string} ident
   */
  constructor(storage, ident) {
    this._storage = new PersistentItemService(storage, ident, () => ({}));
  }

  /**
   * @param {T} value
   * @returns {Promise<string>} created id
   */
  async create(value) {
    const data = await this._data();
    let id = createUuid();
    while(data[id]) {
      // istanbul ignore next: ensure uuid is unique
      id = createUuid();
    }
    const updatedData = { ...data, [id]: value };
    await this._backupData(updatedData);
    return id;
  }

  /**
   * @param {string} itemId 
   * @returns {Promise<T>}
   * @throws item not found
   */
  async read(itemId) {
    const item = await this.exists(itemId);
    if (item) {
      return item
    } else {
      throw this._itemNotFound(itemId);
    }
  }

  /**
   * @param {string} itemId 
   * @returns {Error}
   */
  _itemNotFound(itemId) {
    return new Error(`item with id '${itemId}' not found!`);
  }

  /**
   * @param {IndexedT} data
   * @returns {Promise<IndexedT>}
   */
  async _backupData(data) {
    await this._storage.save(data);
    return await this.reloadData();
  }

  /**
   * @param {string} id
   * @param {T} value 
   * @returns {Promise<T>}
   * @throws item not found
   */
  async update(id, value) {
    const data = await this._data();
    const existingItem = data[id];
    if (!existingItem) {
      throw this._itemNotFound(id);
    }
    const updatedData = { ...data, [id]: value};
    await this._backupData(updatedData);
    const loadedData = await this.read(id);
    return loadedData;
  }

  /**
   * @param {string} id
   * @returns {Promise<T>}
   * @throws item not found
   */
  async delete(id) {
    const data = await this._data();
    const existingItem = data[id];
    if (!existingItem) {
      throw this._itemNotFound(id);
    }
    const updatedData = { ...data };
    delete updatedData[id];
    await this._backupData(updatedData);
    return existingItem;
  }

  /**
   * @param {string} itemId
   * @returns {Promise<T | false>}
   */
  async exists(itemId) {
    const data = await this._data();
    return data[itemId] || false;
  }

  /**
   * @returns {Promise<T[]>}
   */
  async list() {
    const data = await this._data();
    return Object.values(data);
  }
}


/**
 * @template {string | number} T type of result
 * @typedef {SimpleCrudService<T>} SimpleCrudServiceType
 */

module.exports = {SimpleCrudService: SimpleCrudService};