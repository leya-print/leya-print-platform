import { expect } from 'chai';
import { MockedStorageService } from './mocked-storage.service';
import { PersistentItemService } from './persistent-item.service';
import { StorageService } from './storage.service';

const defaultNumber = -1;

describe('persistent item', () => {
  let persistentNumber: PersistentItemService<number>;
  let storage: StorageService;

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

    beforeEach(async () => {
      await persistentNumber.save(settedValue);
    })
    it('should return setted value', async () => {
      const loadedValue = await persistentNumber.load();
      expect(loadedValue).to.equal(settedValue);
    });

    describe('another instance', () => {
      let anotherInstance: PersistentItemService<number>;

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
      let dropped: number;

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
