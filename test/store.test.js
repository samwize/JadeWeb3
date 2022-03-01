import { describe, expect, it } from 'vitest';
import { store, addDraft, Entry } from '../src/store.js';

describe('Store', () => {
  
  describe('#addDraft()', () => {

    it('should add a new draft', () => {
      addDraft(new Entry(null, "c1"));
      
      // Expect 1 draft
      expect(store.drafts.length).eql(1);
      // Expect has date
      let d = store.drafts[0];
      expect(d.date == null).toBeFalsy()
    });
  });
});