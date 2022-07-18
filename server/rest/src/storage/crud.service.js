// @ts-check
'use strict';
/**
 * @typedef {import('./storage.service').StorageService} StorageService
 */


const createUuid = require('uuid').v4;
const { merge, clone } = require('merge');
const { PersistentItemService } = require('./persistent-item.service');

/**
 * @template {{ id: string }} T
 * @template U
 */
class CrudService {
  /**
   * @typedef {import('./storage.service').Indexed<T>} IndexedT
   * @typedef {import('./persistent-item.service').PersistentItem<IndexedT>} PersistentItemIndex
   */

  /**
   * @readonly
   * @type {PersistentItemIndex}
   *
   */
  #storage;

  /**
   * @readonly
   * @type {(id: string, ...params: U[]) => Promise<T> | T}
   */
  #createItem

  /**
   * @readonly
   * @type {string}
   */
  #itemTypeLabel

  /**
   * reload data from storage
   * 
   * @returns {Promise<IndexedT>}
   */
  reloadData() {
    return this.#storage.reloadItem();
  }

  /**
   * 
   * @param {StorageService} storage
   * @param {string} ident
   * @param {(id: string, ...params: U[]) => Promise<T> | T} createItem
   * @param {{
   *   itemTypeLabel?: string,
   * }} options
   */
  constructor(storage, ident, createItem, options = {}) {
    this.#storage = new PersistentItemService(storage, ident, () => ({}));
    this.#createItem = createItem;
    this.#itemTypeLabel = options.itemTypeLabel || ident;
  }

  /**
   * @param {U} params
   * @returns {Promise<T>}
   */
  async create(params) {
    const data = await this.#storage.load();
    let id = createUuid();
    while(data[id]) {
      // istanbul ignore next: ensure uuid is unique
      id = createUuid();
    }
    /** @type T */
    const itemWithId = clone(await this.#createItem(id, params));
    const updatedData = { ...data, [itemWithId.id]: itemWithId};
    const saved = await this._backupData(updatedData);
    return this.readSync(itemWithId.id, saved);
  }

  /**
   * @param {string} itemId 
   * @returns {Promise<T>}
   * @throws item not found
   */
  async read(itemId) {
    const data = await this.#storage.load();
    return this.readSync(itemId, data);
  }

  /**
   * @param {string} itemId 
   * @returns {Error}
   */
  _itemNotFound(itemId) {
    return new Error(`${this.#itemTypeLabel} with id '${itemId}' not found!`);
  }

  /**
   * @param {IndexedT} data
   * @returns {Promise<IndexedT>}
   */
  async _backupData(data) {
    await this.#storage.save(data);
    return await this.reloadData();
  }

  /**
   * @param {Partial<T> & { id: string }} updatedItem 
   * @returns {Promise<T>}
   * @throws item not found
   */
  async update(updatedItem) {
    const id = updatedItem.id;
    const data = await this.#storage.load();
    const existingItem = data[id];
    if (!existingItem) {
      throw this._itemNotFound(id);
    }
    const mergedItem = merge(true, true, existingItem, updatedItem);
    const updatedData = { ...data, [id]: mergedItem};
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
    const data = await this.#storage.load();
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
   * @returns {Promise<T[]>}
   */
  async list() {
    const data = await this.#storage.reloadItem();
    return Object.values(data).map(clone);
  }

  /**
   * @returns {Promise<IndexedT>}
   */
  async dump() {
    return this.#storage.reloadItem();
  }

  /**
   * @param {string} id 
   * @param {IndexedT} data 
   * @returns {T}
   * @throws not found
   */
  readSync(id, data) {
    const item = this.existsSync(id, data);
    if (item) {
      return item
    } else {
      throw this._itemNotFound(id);
    }
  }

  /**
   * @param {string} id
   * @return {Promise<T | false>}
   */
  async exists(id) {
    const data = await this.#storage.load();
    return this.existsSync(id, data);
  }

  /**
   * @param {string} id 
   * @param {IndexedT} data 
   * @returns {T | false}
   */
  existsSync(id, data) {
    const existingItem = data[id];
    return existingItem ? clone(existingItem) : false;
  }
}

/**
 * @template {{ id: string }} T type of result
 * @template U additional args to create default value
 * @typedef {CrudService<T, U>} CrudServiceType
 */

module.exports = {CrudService};