import { computed, reactive } from 'vue'

export const store = reactive({
  published: {},
  drafts: [],
})

export function resetStore() {
    store.published = [];
    store.drafts = [];
}

let stateKey = 'state'

export function saveStore() {
    console.log("Saving store", store);
    localStorage.setItem(stateKey, JSON.stringify(store));
}

export function loadStore() {
    let localState = JSON.parse(localStorage.getItem(stateKey));
    console.log("Loading store", localState);
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

const dateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

export class Entry {
    constructor(date, content, photos) {
        if (date == null) {
            this.date = new Date();
        } else {
            this.date = date;
        }
        
        this.content = content;
        this.photos = photos ?? [];
    }

    get shortDate() {
        return this.date.toLocaleDateString(undefined, dateFormatOptions);
    }

    get firstPhoto() {
        return photos[0];
    }

}

export function addPublished(txnId, entry) {
    if (store.published[txnId] == null) {
        store.published[txnId] = entry;
        saveStore();
    }
}
