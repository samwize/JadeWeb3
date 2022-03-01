import { reactive } from 'vue'

export const store = reactive({
  published: [],
  drafts: [],
})

export function addDraft(draft) {
    this.store.drafts.push(draft);
}

export class Entry {
    constructor(date, content) {
        this.date = date ?? Date();
        this.content = content;
    }
}
