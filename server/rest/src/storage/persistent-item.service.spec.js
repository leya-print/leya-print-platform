// @ts-check
/// <reference types="mocha" />
"use strict";

/**
 * @typedef {import('./persistent-item.service').PersistentItem<number>} PersistentNumber
 * @typedef {import('./storage.service').StorageService } StorageService
 */

const { expect } = require("chai");
const { MockedStorageService } = require("./mocked-storage.service");
const { PersistentItemService } = require("./persistent-item.service");

const defaultNumber = -1;

describe('persistent item', () => {
  /** @type {PersistentNumber} */
  let persistentNumber;

  /** @type {StorageService} */
  let storage;

  function createInstance() {
    return new PersistentItemService(
      storage,
      'number-sample',
      () => Promise.resolve(defaultNumber),
    );
  }

  beforeEach(() => {
    storage = new MockedStorageService();
    persistentNumber = createInstance();
  });
  afterEach(() => persistentNumber.drop());

  it('should be instanciable', () => {
    expect(persistentNumber).not.to.be.undefined;
  });

  describe('before any value set', () => {
    it('should create default item', async () => {
      expect(await persistentNumber.load()).to.equal(defaultNumber);
    });
  });

  describe('after set', () => {
    const settedValue = 2
    /** @type {number} */
    let savedValue;
    beforeEach(async () => {
      savedValue = await persistentNumber.save(settedValue);
    })
    it('should return setted value', async () => {
      const loadedValue = await persistentNumber.load();
      expect(loadedValue).to.equal(settedValue);
    });

    describe('another instance', () => {
      /** @type {PersistentNumber} */
      let anotherInstance;

      beforeEach(() => {
        anotherInstance = createInstance();
      });

      it('should return setted value', async () => {
        expect(await anotherInstance.load()).to.equal(settedValue);
      });

      describe('changed value', () => {
        beforeEach(async () => {
          await anotherInstance.save(3);
        });

        it('load will return setted value', async () => {
          expect(await persistentNumber.load()).to.equal(3);
        });

        it('reload will return updated value', async () => {
          expect(await persistentNumber.reloadItem()).to.equal(3);
        });
      });
    });

    describe('dropped', () => {
      /** @type {number} */
      let dropped;

      beforeEach(async () => {
        dropped = await persistentNumber.drop() || -1;
      });

      it('should have returned setted number', () => {
        expect(dropped).to.equal(settedValue);
      });

      it('should return default number', async () => {
        expect(await persistentNumber.load()).to.equal(defaultNumber);
      });
    })
  });
});