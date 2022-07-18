// @ts-check
/// <reference types="mocha" />
"use strict";

const { expect } = require('chai');
const { MockedStorageService } = require('./mocked-storage.service');
const { PersistentCollectionService } = require('./persistent-collection.service');

/**
 * @typedef {import('./persistent-collection.service').PersistentCollection<number> } PersistentNumberCollection
 * @typedef {import('../storage/storage.service').StorageService} StorageService
 */

let nextNumber = 1;
function nextUnusedNumber() {
  return nextNumber++;
}

describe('storage persistent collection service', () => {
  /** @type {PersistentNumberCollection} */
  let persistentCollection;

  /** @type {MockedStorageService} */
  let mockedStorageService;

  function createInstance() {
    return new PersistentCollectionService(mockedStorageService, 'test-collection', 1);
  }
  
  beforeEach(async () => {
    mockedStorageService = new MockedStorageService;
    persistentCollection = createInstance();
  });
  afterEach(() => persistentCollection.drop());

  it('should be instancable', () => {
    expect(persistentCollection).not.to.be.undefined;
  });

  describe('push', async () => {
    it('should add number the collection', async () => {
      const num = nextUnusedNumber();
      await persistentCollection.push(num);

      const list = await persistentCollection.toArray();
      expect(list).to.deep.equal([num]);
    });
  });

  describe('drop', async () => {
    it('should reset collection', async () => {
      const num = nextUnusedNumber();
      await persistentCollection.push(num);
      const dropped = await persistentCollection.drop();
      expect(dropped).to.deep.equal([num], 'dropped');

      const list = await persistentCollection.toArray();
      expect(list).to.deep.equal([], 'post dropped');
    });
  });

  describe('remove', async () => {
    it('should filter collection', async () => {
      await persistentCollection.push(1);
      await persistentCollection.push(2);
      await persistentCollection.push(3);
      await persistentCollection.push(4);

      const removed = await persistentCollection.remove((item) => 1 < item && item < 4);
      const remaining = await persistentCollection.toArray();

      expect(removed).to.deep.equal([2, 3], 'removed');
      expect(remaining).to.deep.equal([1, 4], 'remaining');
    });
  });

  describe('includes', async () => {
    it('should return true for existing item', async () => {
      const num = nextUnusedNumber();
      await persistentCollection.push(num);
      expect(await persistentCollection.includes(num)).to.be.true;
    });
    it('should return false for unknown item', async () => {
      const num = nextUnusedNumber();
      expect(await persistentCollection.includes(num)).to.be.false;
    });
  });
});