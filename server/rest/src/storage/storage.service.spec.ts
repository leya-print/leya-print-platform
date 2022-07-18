import { expect } from 'chai'
import { StorageItemDescription, StorageService } from './storage.service';

type ItemType = { timestamp: number };

const defaultsTimestamp = -1;
const defaultValue: ItemType = { timestamp: defaultsTimestamp };

const testItemDescriptor: StorageItemDescription<ItemType> = {
  ident: 'known',
  createDefault: () => Promise.resolve(defaultValue),
};

export function testStorageService(createStorageService: () => StorageService) {
  let storageService: StorageService;

  beforeEach(() => {
    storageService = createStorageService();
  });
  afterEach(async () => {
    await storageService.drop(testItemDescriptor.ident);
  })

  it('should start without errors', () => {
    expect(storageService).not.to.be.undefined;
  });

  describe('load', () => {
    describe('for unknown descriptors', () => {
      it('should initialize the default object', async () => {
        const loaded = await storageService.load(testItemDescriptor);

        expect(loaded.timestamp).to.equal(defaultsTimestamp);
        expect(loaded === defaultValue).to.be.false
      });
    });

    describe('for known descriptors', () => {
      let savedValue: ItemType;

      beforeEach(async () => {
        savedValue = { timestamp: Date.now() };
        await storageService.save(testItemDescriptor.ident, savedValue);
      });

      it('should return known object', async () => {
        const loadedValue = await storageService.load(testItemDescriptor);
        expect(loadedValue.timestamp).to.equal(savedValue.timestamp);
        expect(loadedValue === savedValue).to.be.false;
      });
    });
  });

  describe('save', () => {
    it('should rather throw than saving undefined', async () => {
      try {
        await storageService.save(testItemDescriptor.ident, undefined);
        // istanbul ignore next: specs should not fail
        expect.fail('did not thorw');
      } catch (e) {
        expect('' + e).to.contain('undefined');
      }
    });
  })

  describe('drop', () => {
    describe('existing object', () => {
      const savedValue = { timestamp: Date.now() };
      beforeEach(async () => {
        await storageService.save(testItemDescriptor.ident, savedValue);
      });

      it('should return remove object', async () => {
        const droppedValue = await storageService.drop<ItemType>(testItemDescriptor.ident);
        expect(droppedValue?.timestamp).to.equal(savedValue.timestamp);
        expect(droppedValue === savedValue).to.be.false;
      });

      it('should remove object (and therefor return new default value in next call)', async () => {
        await storageService.drop(testItemDescriptor.ident);

        const loadedValue = await storageService.load(testItemDescriptor);
        const defaultValue = await testItemDescriptor.createDefault();

        expect(loadedValue.timestamp).not.to.equal(savedValue.timestamp);
        expect(loadedValue.timestamp).to.equal(defaultValue.timestamp);
      });
    })

    it('should return undefined if threre was no entry', async () => {
      const droppedValue = await storageService.drop('unknown-ident');
      expect(droppedValue).to.be.undefined;
    });
  });

  it('should be able to handle number values', async () => {
    const ident = 'test-number';
    const settedNumber = 3;
    const descriptor = { ident, createDefault: () => -1 };

    const defaultValue = await storageService.load(descriptor);
    expect(defaultValue).to.equal(-1, 'defaultValue');
    expect(typeof defaultValue).to.equal('number', 'defaultValue');

    const savedNumber = await storageService.save(ident, settedNumber);
    expect(savedNumber).to.equal(settedNumber, 'savedNumber');
    expect(typeof savedNumber).to.equal('number', 'savedNumber');

    const loadedNumber = await storageService.load(descriptor);
    expect(loadedNumber).to.equal(settedNumber, 'loadedNumber');
    expect(typeof loadedNumber).to.equal('number', 'loadedNumber');

    const droppedNumber =  await storageService.drop(ident);
    expect(droppedNumber).to.equal(settedNumber, 'droppedNumber');
    expect(typeof droppedNumber).to.equal('number', 'droppedNumber');
  });

  it('should be able to handle string values', async () => {
    const ident = 'test-string';
    const settedString = 'setted string';
    const descriptor = { ident, createDefault: () => 'not ' + settedString };

    const defaultValue = await storageService.load(descriptor);
    expect(defaultValue).to.equal('not setted string', 'defaultValue');
    expect(typeof defaultValue).to.equal('string', 'defaultValue');

    const saved = await storageService.save(ident, settedString);
    expect(saved).to.equal(settedString, 'saved');
    expect(typeof saved).to.equal('string', 'saved');

    const loaded = await storageService.load(descriptor);
    expect(loaded).to.equal(settedString, 'loaded');
    expect(typeof loaded).to.equal('string', 'loaded');

    const dropped = await storageService.drop(ident);
    expect(dropped).to.equal(settedString, 'dropped');
    expect(typeof dropped).to.equal('string', 'dropped');
  });

  it('should be able to handle array values', async () => {
    const ident = 'test-array';
    const defaultArray: any[] = [];
    const settedArray = ['setted string', 3, { bla: 'blubb' }];
    const descriptor = { ident, createDefault: () => defaultArray };

    const defaultValue = await storageService.load(descriptor);
    expect(defaultValue).to.deep.equal(defaultArray, 'defaultValue');
    expect(typeof defaultValue).to.equal('object', 'defaultValue');

    const saved = await storageService.save(ident, settedArray);
    expect(saved).to.deep.equal(settedArray, 'saved');
    expect(typeof saved).to.equal('object', 'saved');

    const loaded = await storageService.load(descriptor);
    expect(loaded).to.deep.equal(settedArray, 'loaded');
    expect(typeof loaded).to.equal('object', 'loaded');

    const dropped = await storageService.drop(ident);
    expect(dropped).to.deep.equal(settedArray, 'dropped');
    expect(typeof dropped).to.equal('object', 'dropped');
  });
}



module.exports = { testStorageService };
