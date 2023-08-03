// @ts-check
/// <reference types="mocha" />
"use strict";

const { expect } = require('chai');

const { CrudService } = require('./crud.service');
const { MockedStorageService } = require('./mocked-storage.service');

class SampleItemType {
  /** @type {string} */
  id;

  /** @type {{ nested: { title: string } }} */
  deep;

  /**
   * @param {string} id
   * @param {string} title
   */
  constructor(id, title) {
    this.id = id;
    this.deep = { nested: { title } };
  }
}

describe('storage crud service', () => {
  /** @type {CrudService<SampleItemType, string>} */
  let crudService;

  /** @type {MockedStorageService} */
  let mockedStorageService;

  beforeEach(() => {
    mockedStorageService = new MockedStorageService();
    crudService = createServiceInstance();
  });

  /**
   * @returns {CrudService<SampleItemType, string>}
   */
  function createServiceInstance() {
    /**
     *
     * @param {string} id
     * @param {string} title
     * @returns {Promise<SampleItemType>}
     */
    async function init(id, title) {
      return new SampleItemType(id, title);
    }
    return new CrudService(mockedStorageService, 'test-object-type', init);
  }

  describe('create', () => {
    /** @type {SampleItemType} */
    let createdItem;

    beforeEach(async () => {
      createdItem = await crudService.create('createdItem');
    });

    it('should generate id and merge title', () => {
      expect(!!createdItem).to.be.true;
      expect(typeof createdItem.id).to.equal('string');
      expect(createdItem.id.length).to.be.greaterThan(0);
      expect(createdItem.deep.nested.title).to.equal('createdItem');
    });

    it('should save created item', async () => {
      const newServiceInstance = createServiceInstance();
      const loadedItem = await newServiceInstance.read(createdItem.id);

      expect(loadedItem).to.deep.equal(createdItem);
    });
  });

  describe('read', () => {
    describe('existing item', () => {
      /** @type {SampleItemType} */
      let existingItem;
      beforeEach(async () => {
        existingItem =  await crudService.create('existingItem');
      });


      it('should return exiting item', async () => {
        const loadedItem = await crudService.read(existingItem.id);
        expect(!!loadedItem).to.be.true;
        expect(loadedItem.id).to.equal(existingItem.id);
        expect(loadedItem.deep.nested.title).to.equal(existingItem.deep.nested.title);
      });

      it('should return cloned item', async () => {
        const loadedItem = await crudService.read(existingItem.id);
        expect(loadedItem === existingItem).to.be.false;
      })
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
      /** @type {SampleItemType} */
      let origItem;
      const updatedTitle = 'updated title';
      /** @type {Partial<SampleItemType> & {id: string}} */
      let updatedItem;
      /** @type {SampleItemType} */
      let savedItem;

      beforeEach(async () => {
        origItem = await crudService.create('orig item');
        updatedItem = {
          id: origItem.id,
          deep: { nested: { title: updatedTitle }},
        };
        savedItem = await crudService.update(updatedItem);
      });

      it('should update existing item', async () => {

        expect(savedItem.id).to.equal(origItem.id);
        expect(savedItem.deep.nested.title).to.equal(updatedTitle);
        expect(savedItem === updatedItem).to.be.false;
      });

      it('should save updated item', async () => {
        const newServiceInstance = createServiceInstance();

        const loadedItem = await newServiceInstance.read(origItem.id);

        expect(loadedItem.id).to.equal(origItem.id);
        expect(loadedItem.deep.nested.title).to.equal(updatedTitle);
        expect(loadedItem === updatedItem).to.be.false;
      });
    });

    it('should throw for unknown ids', async () => {
      try {
        await crudService.update(new SampleItemType('unknown-id', 'unknown-title'));
        // istanbul ignore next: specs should not fail
        expect.fail('did not throw');
      } catch (e) {
        expect('' + e).to.contain('unknown-id');
      }
    })
  });

  describe('delete', () => {
    describe('with known id', () => {
      /** @type {SampleItemType} */
      let origItem;

      /** @type {SampleItemType} */
      let deletedItem;

      beforeEach(async () => {
        origItem = await crudService.create('orig item');
        deletedItem = await crudService.delete(origItem.id);
      });

      it('should return deleted item', async () => {
        expect(deletedItem.id).to.equal(origItem.id);
        expect(deletedItem.deep.nested.title).to.equal(origItem.deep.nested.title);
        expect(deletedItem === origItem).to.be.false;
        expect(deletedItem.deep === origItem.deep).to.be.false;
        expect(deletedItem.deep.nested === origItem.deep.nested).to.be.false;
      });

      it('should remove item from its storage cache', async () => {
        try {
          await crudService.read(deletedItem.id);
          // istanbul ignore next: specs should not fail
          expect.fail('did not throw');
        } catch (e) {
          expect('' + e).to.contain(deletedItem.id);
        }
      });

      it('should remove item from storage', async () => {
        const newServiceInstance = createServiceInstance();
        try {
          await newServiceInstance.read(deletedItem.id);
          // istanbul ignore next: specs should not fail
          expect.fail('did not throw');
        } catch (e) {
          expect('' + e).to.contain(deletedItem.id);
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
    it('should return true for existing item', async () => {
      const existingItem = await crudService.create('existing item');

      expect(await crudService.exists(existingItem.id)).to.deep.equal(existingItem);
    });

    it('should return false for unknown item', async () => {
      expect(await crudService.exists('unknown-id')).to.be.false;
    });
  });

  describe('list', () => {
    describe('initially', () => {
      it('should return an empty list', async () => {
        const itemList = await crudService.list();
        expect(itemList.length).to.equals(0);
      });
    });

    describe('after creating an item', () => {
      /** @type {SampleItemType} */
      let origItem;

      beforeEach(async () => {
        origItem = await crudService.create('orig item');
      });

      it('should return a list containing a clone of that item', async () => {
        const list = await crudService.list();
        expect(list).to.deep.equal([origItem]);
      });

      describe('after adding another item', () => {
        /** @type {SampleItemType} */
        let anotherItem;

        beforeEach(async () => {
          anotherItem = await crudService.create('another item');
        });

        it('should append that item', async () => {
          const list = await crudService.list();
          expect(list).to.deep.equal([origItem, anotherItem]);
        });
      })
    });
  });

  describe('dump', () => {
    describe('initially', () => {
      it('should return an empty map', async () => {
        const dump = await crudService.dump();
        expect(dump).to.deep.equal({});
      });
    });

    describe('after creating an item', () => {
      /** @type {SampleItemType} */
      let origItem;

      beforeEach(async () => {
        origItem = await crudService.create('orig item');
      });

      it('should return a map containing a clone of that item', async () => {
        const dump = await crudService.dump();
        expect(dump).to.deep.equal({ [origItem.id]: origItem });
      });

      describe('after adding another item', () => {
        /** @type {SampleItemType} */
        let anotherItem;

        beforeEach(async () => {
          anotherItem = await crudService.create('another item');
        });

        it('should append that item', async () => {
          const dump = await crudService.dump();
          expect(dump).to.deep.equal({
            [origItem.id]: origItem,
            [anotherItem.id]: anotherItem,
          });
        });
      })
    });
  });
});
