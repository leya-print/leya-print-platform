import { StorageItemDescription, StorageService } from './storage.service';

export class PersistentItemService<T> {
  private readonly _descriptor: StorageItemDescription<T>;

  constructor(
    private readonly _storage: StorageService,
    private readonly _ident: string,
    createDefault: () => Promise<T> | T,
  ) {
    this._descriptor = { ident: _ident, createDefault };
  }

  async save(item: T): Promise<T> {
    await this._storage.save(this._ident, item);
    return this.reloadItem();
  }

  /**
   * reload data from storage
   */
  async reloadItem(): Promise<T> {
    const item = this._storage.load(this._descriptor);
//    this.load = () => item;
    return item;
  }

  load(): Promise<T> {
    return this.reloadItem();
  }

  async drop(): Promise<T|undefined> {
    this.load = this.reloadItem.bind(this);
    return this._storage.drop(this._ident);
  }
}
