import { describe, expect, it, beforeEach } from 'vitest';
import { store, resetStore, addNewDraft, Entry } from '../src/store.js';

beforeEach(() => {
  resetStore();
});

describe('Store', () => {
  
  describe('#addNewDraft()', () => {

    it('should add a new draft with no content', () => {
      let d = addNewDraft();
      
      expect(store.drafts.length).eql(1);
      expect(d.content).eql(null);
    });

    it('should have a default date', () => {
      addNewDraft();

      // Expect has date
      let draft = store.drafts[0];
      expect(draft.date == null).toBeFalsy();
      expect(draft.date.getTime()).closeTo((new Date()).getTime(), 2);
    });
  });
});