import { clone } from 'merge';
import { PersistentItemService } from './persistent-item.service';
import { StorageService } from './storage.service';

export class PersistentCollectionService<T extends number | string> {
  #data: PersistentItemService<T[]>;

  /**
   * @param {StorageService} storage
   * @param {string} ident
   * @param {T} _sample
   */
  constructor(
    storage: StorageService,
    ident: string,
    _sample: T,
  ) {
    this.#data = new PersistentItemService(storage, ident, () => []);
  }

  async push(item: T): Promise<void> {
    const data = await this.#data.load();
    data.push(clone(item));
    await this.#data.save(data);
  }

  async remove(filterFn: (item: T) => boolean): Promise<T[]> {
    const origData = await this.#data.load();
    const { removed, remaining } = origData.reduce((sorted, next) => {
      if (filterFn(next)) {
        sorted.removed.push(next);
      } else {
        sorted.remaining.push(next);
      }
      return sorted;
    }, { removed: [] as T[], remaining: [] as T[] });
    await this.#data.save(remaining);
    return removed;
  }

  async toArray(): Promise<T[]> {
    const data = await this.#data.reloadItem();
    return data.map(clone);
  }

  async drop() {
    return await this.#data.drop();
  }

  async includes(item: T): Promise<boolean> {
    const data = await this.#data.load();
    return data.includes(item);
  }
}
