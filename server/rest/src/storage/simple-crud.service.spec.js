// @ts-check
/// <reference types="mocha" />
"use strict";

const { expect } = require('chai');

const { SimpleCrudService } = require('./simple-crud.service');
const { MockedStorageService } = require('./mocked-storage.service');

let nextNumber = 1;
function nextUnusedNumber() {
  return nextNumber++;
}

describe('storage simple crud service', () => {
  /** @type {SimpleCrudService<number>} */
  let crudService;

  /** @type {MockedStorageService} */
  let mockedStorageService;

  beforeEach(() => {
    mockedStorageService = new MockedStorageService();
    crudService = createServiceInstance();
  });

  /**
   * @returns {SimpleCrudService<number>}
   */
  function createServiceInstance() {
    return new SimpleCrudService(mockedStorageService, 'test-object-type');
  }

  describe('create', () => {
    const createdNumber = nextUnusedNumber();
    /** @type {string} */
    let createdNumberId;

    beforeEach(async () => {
      createdNumberId = await crudService.create(createdNumber);
    });

    it('should return id of created number', () => {
      expect(!!createdNumberId).to.be.true;
      expect(typeof createdNumberId).to.equal('string');
      expect(createdNumberId.length).to.be.greaterThan(0);
    });

    it('should save created number', async () => {
      const newServiceInstance = createServiceInstance();
      const loadedNumber = await newServiceInstance.read(createdNumberId);

      expect(loadedNumber).to.equal(createdNumber);
    });
  });

  describe('read', () => {
    describe('existing number', () => {
      const existingNumber = nextUnusedNumber();
      /** @type {string} */
      let existingNumberId;

      beforeEach(async () => {
        existingNumberId =  await crudService.create(existingNumber);
      });


      it('should return exiting number', async () => {
        const loadedNumber = await crudService.read(existingNumberId);
        expect(!!loadedNumber).to.be.true;
        expect(loadedNumber).to.equal(existingNumber);
      });
    });


    it('should throw for unknown ids', async () => {
      try {
        await crudService.read('unknown-id');
        // istanbul ignore next: specs should not fail
        expect.fail('did not throw');
      } catch (e) {
        expect('' + e).to.contain('unknown-id');
      }
    })
  });

  describe('updated', () => {
    describe('with known id', () => {
      const origNumber = nextUnusedNumber();
      /** @type {string} */
      let origNumberId;

      /** @type {number} */
      const updatedNumber = nextUnusedNumber();
      /** @type {number} */
      let savedNumber;

      beforeEach(async () => {
        origNumberId = await crudService.create(origNumber);
        savedNumber = await crudService.update(origNumberId, updatedNumber);
      });

      it('should update existing number', async () => {
        expect(savedNumber).to.equal(updatedNumber);
      });

      it('should save updated number', async () => {
        const newServiceInstance = createServiceInstance();

        const loadedNumber = await newServiceInstance.read(origNumberId);

        expect(loadedNumber).to.equal(updatedNumber);
        expect(loadedNumber).not.to.equal(origNumber);
      });
    });

    it('should throw for unknown ids', async () => {
      try {
        await crudService.update('unknown-id', nextUnusedNumber());
        // istanbul ignore next: specs should not fail
        expect.fail('did not throw');
      } catch (e) {
        expect('' + e).to.contain('unknown-id');
      }
    })
  });

  describe('delete', () => {
    describe('with known id', () => {
      const origNumber = nextUnusedNumber();

      /** @type {string} */
      let origNumberId;

      /** @type {number} */
      let deletedNumber;

      beforeEach(async () => {
        origNumberId = await crudService.create(origNumber);
        deletedNumber = await crudService.delete(origNumberId);
      });
      
      it('should return deleted number', async () => {
        expect(deletedNumber).to.equal(origNumber);
      });

      it('should remove number from its storage cache', async () => {
        try {
          await crudService.read(origNumberId);
          // istanbul ignore next: specs should not fail
          expect.fail('did not throw');
        } catch (e) {
          expect('' + e).to.contain(origNumberId);
        }
      });

      it('should remove number from storage', async () => {
        const newServiceInstance = createServiceInstance();
        try {
          await newServiceInstance.read(origNumberId);
          // istanbul ignore next: specs should not fail
          expect.fail('did not throw');
        } catch (e) {
          expect('' + e).to.contain(origNumberId);
        }
      });
    });

    it('should throw for unknown ids', async () => {
      try {
        await crudService.delete('unknown-id');
        // istanbul ignore next: specs should not fail
        expect.fail('did not throw');
      } catch (e) {
        expect('' + e).to.contain('unknown-id');
      }
    });
  });

  describe('exists', () => {
    it('should return true for existing number', async () => {
      const existingNumber = nextUnusedNumber();
      const existingNumberId = await crudService.create(existingNumber);

      expect(await crudService.exists(existingNumberId)).to.equal(existingNumber);
    });

    it('should return false for unknown number', async () => {
      expect(await crudService.exists('unknown-id')).to.be.false;
    });
  });

  describe('list', () => {
    describe('initially', () => {
      it('should return an empty list', async () => {
        const numberList = await crudService.list();
        expect(numberList.length).to.equals(0);
      });
    });

    describe('after creating a number', () => {
      const origNumber = nextUnusedNumber();

      /** @type {string} */
      let origNumberId;

      beforeEach(async () => {
        origNumberId = await crudService.create(origNumber);
      });

      it('should return a list containing a clone of that number', async () => {
        const list = await crudService.list();
        expect(JSON.stringify(list)).to.equal(JSON.stringify([origNumber]));
        expect(list[0]).to.equal(origNumber);
      });

      describe('after adding another number', () => {
        const anotherNumber = nextUnusedNumber();
        /** @type {string} */
        let anotherNumberId;

        beforeEach(async () => {
          anotherNumberId = await crudService.create(anotherNumber);
        });

        it('should append that number', async () => {
          const list = await crudService.list();
          expect(list.length).to.equal(2);
          expect(list[0]).to.equal(origNumber);
          expect(list[1]).to.equal(anotherNumber);
        });
      })
    });
  });
});