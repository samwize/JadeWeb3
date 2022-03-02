import { reactive } from 'vue'

export const store = reactive({
  published: [],
  drafts: [],
})

export function resetStore() {
    store.published = [];
    store.drafts = [];
}

let stateKey = 'state'

export function saveStore() {
    console.log(getDraft());
    console.log(store);
    localStorage.setItem(stateKey, JSON.stringify(store));
}

export function loadStore() {
    let localState = JSON.parse(localStorage.getItem(stateKey));
    console.log(localState);
    if (localState == null) {
        store.published = [];
        store.drafts = [];
    } else {
        store.published = localState.published ?? [];
        store.drafts = localState.drafts ?? [];
    }
}

export function getDraft() {
    if (store.drafts.length == 0) {
        return addNewDraft();
    } else {
        return store.drafts[0]
    }
}

export function addNewDraft() {
    let draft = new Entry(null, null);
    store.drafts.push(draft);
    return draft;
}

export class Entry {
    constructor(date, content) {
        if (date == null) {
            this.date = new Date();
        } else {
            this.date = date;
        }
        
        this.content = content;
    }
}
