import { PersistentItemService } from './persistent-item.service';
import { Indexed, StorageService } from './storage.service';
import { v4 as createUuid } from 'uuid';

export class SimpleCrudService<T extends string | number> {
  /**
   * @typedef {import('./storage.service').Indexed<T>} IndexedT
   * @typedef {import('./persistent-item.service').PersistentItem<IndexedT>} PersistentIndexedT
   * @typedef {import('./storage.service').StorageItemDescription<IndexedT>} StorageItemDescription
   */

  private _storage: PersistentItemService<Indexed<T>>;

  /**
   * reload data from storage
   */
  reloadData(): Promise<Indexed<T>> {
    return this._storage.reloadItem();
  }

  private _data(): Promise<Indexed<T>> {
    return this._storage.load();
  }

  /**
   *
   * @param {StorageService} storage
   * @param {string} ident
   */
  constructor(
    storage: StorageService,
    ident: string,
  ) {
    this._storage = new PersistentItemService(storage, ident, () => ({}));
  }

  async create(value: T): Promise<string> {
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

  async read(itemId: string): Promise<T> {
    const item = await this.exists(itemId);
    if (item) {
      return item
    } else {
      throw this._itemNotFound(itemId);
    }
  }

  _itemNotFound(itemId: string): Error {
    return new Error(`item with id '${itemId}' not found!`);
  }

  async _backupData(data: Indexed<T>): Promise<Indexed<T>> {
    await this._storage.save(data);
    return await this.reloadData();
  }

  async update(id: string, value: T): Promise<T> {
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

  async delete(id: string): Promise<T> {
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

  async exists(itemId: string): Promise<T | false> {
    const data = await this._data();
    return data[itemId] || false;
  }

  async list(): Promise<T[]> {
    const data = await this._data();
    return Object.values(data);
  }
}
