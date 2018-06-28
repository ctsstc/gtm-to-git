import { assert } from 'chai';
import { describe } from 'mocha';
import Formatter from './formatter';

describe('Input', () => {
  describe('listCollection', () => {
    const collection = [
      { name: 'First' },
      { name: 'Second' },
      { name: 'Third' }
    ];

    it('Returns a formatted list from the collection', () => {
      const formattedCollection = Formatter.listCollection(collection, 'name');
      assert.equal(formattedCollection, '1: First\n2: Second\n3: Third');
    });
  });
});
