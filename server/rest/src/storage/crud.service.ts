import { v4 as createUuid } from 'uuid';
import { merge, clone } from 'merge';
import { PersistentItemService } from './persistent-item.service';
import { Indexed, StorageService } from './storage.service';

export class CrudService<T extends { id: string }, U> {
  #storage: PersistentItemService<Indexed<T>>;
  #createItem: (id: string, ...params: U[]) => Promise<T> | T;
  #itemTypeLabel: string;

  reloadData(): Promise<Indexed<T>> {
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
  constructor(
    storage: StorageService,
    ident: string,
    createItem: (id: string, ...params: U[]) => Promise<T> | T,
    options: {
      itemTypeLabel?: string,
  } = {}) {
    this.#storage = new PersistentItemService(storage, ident, () => ({}));
    this.#createItem = createItem;
    this.#itemTypeLabel = options.itemTypeLabel || ident;
  }

  async create(params: U): Promise<T> {
    const data = await this.#storage.load();
    let id = createUuid();
    while(data[id]) {
      // istanbul ignore next: ensure uuid is unique
      id = createUuid();
    }
    const itemWithId: T = clone(await this.#createItem(id, params));
    const updatedData = { ...data, [itemWithId.id]: itemWithId};
    const saved = await this._backupData(updatedData);
    return this.readSync(itemWithId.id, saved);
  }

  async read(itemId: string): Promise<T> {
    const data = await this.#storage.load();
    return this.readSync(itemId, data);
  }

  _itemNotFound(itemId: string): Error {
    return new Error(`${this.#itemTypeLabel} with id '${itemId}' not found!`);
  }

  async _backupData(data: Indexed<T>): Promise<Indexed<T>> {
    await this.#storage.save(data);
    return await this.reloadData();
  }

  async update(updatedItem: Partial<T> & { id: string }): Promise<T> {
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

  async delete(id: string): Promise<T> {
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

  async list(): Promise<T[]> {
    const data = await this.#storage.reloadItem();
    return Object.values(data).map(clone);
  }

  async dump(): Promise<Indexed<T>> {
    return this.#storage.reloadItem();
  }

  readSync(id: string, data: Indexed<T>): T {
    const item = this.existsSync(id, data);
    if (item) {
      return item
    } else {
      throw this._itemNotFound(id);
    }
  }

  async exists(id: string): Promise<T | false> {
    const data = await this.#storage.load();
    return this.existsSync(id, data);
  }

  existsSync(id: string, data: Indexed<T>): T | false {
    const existingItem = data[id];
    return existingItem ? clone(existingItem) : false;
  }
}
