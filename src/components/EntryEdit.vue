<script setup>
import { ref, onMounted } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
import PrimaryButton from '/src/uikit/PrimaryButton.vue';
import DestructiveButton from '/src/uikit/DestructiveButton.vue';
import { store, getDraft, saveStore, Entry } from '/src/store.js'
import * as ArweaveKit from '/src/utils/arweavekit.js'

let entryPlaceholder = "Sup? Write your journal entry here";

const draft = ref(new Entry());

onMounted(() => {
    draft.value = getDraft();
})

function deleteDraft() {
    draft.value.date = Date();
    draft.value.content = null;
    saveStore();
}

function publishDraft() {
    ArweaveKit.publish(draft.value).then(ok => {
        if (ok) {
            deleteDraft();
        }
    });    
}

</script>

<template>
    <div class="text-left m-2">
        <Datepicker v-model="draft.date" class="pb-2" placeholder="Entry date" textInput autoApply required :enableTimePicker="false" position="left" monthNameFormat="long"></Datepicker>

        <textarea id="message" rows="15" class="block p-4 w-full text-lg text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="entryPlaceholder" v-model="draft.content"></textarea>
        
        <div class="flex mt-4">
            <input class="flex-1 block text-sm text-gray-900 bg-gray-50 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="photo" type="file">
            
            <div class="ml-4">
                <DestructiveButton @click="deleteDraft">Delete</DestructiveButton>
                <PrimaryButton @click="saveStore">Save Draft</PrimaryButton>
                <PrimaryButton @click="publishDraft">Publish</PrimaryButton>
            </div>
        </div>

        <div class="container mx-auto px-2">
            <p class="float-right text-right">{{ ArweaveKit.txnStatus.value }}</p>
        </div>
    </div>
</template>
