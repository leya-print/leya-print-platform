import { StorageService, StorageItemDescription } from './storage.service';

const { clone } = require('merge');

export class MockedStorageService implements StorageService {
  multiStore: { [key: string]: any } = {};
  lastSavedItem?: any;

  async load<T>(descriptor: StorageItemDescription<T>) {
    const existing = this.multiStore[descriptor.ident];
    if (existing) {
      return clone(existing);
    }

    const created = await descriptor.createDefault();
    this.multiStore[descriptor.ident] = created;
    return clone(created);
  }

  async save<T>(ident: string, data: T) {
    if (data === undefined) {
      throw new Error(`no data (${typeof data})`);
    }
    this.lastSavedItem = data;
    const clonedData = clone(data);
    this.multiStore[ident] = clonedData;
    return clonedData;
  }

  async drop<T>(ident: string): Promise<T> {
    const droppedItem = this.multiStore[ident];
    delete this.multiStore[ident];
    return droppedItem;
  }
}

module.exports = { MockedStorageService };
