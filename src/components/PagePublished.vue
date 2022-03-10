<script setup>

import { onMounted, computed } from "@vue/runtime-core";
import * as ArweaveKit from '/src/utils/arweavekit.js';
import { store, Entry } from '/src/store.js';
import { RefreshIcon } from '@heroicons/vue/outline';

onMounted(() => {
    // ArweaveKit.fetchTransactions()
})

const entries = computed(() => {
    store.published.sort((x, y) => x.date - y.date);
});

function refresh() {
    console.log(store);
    store.published["xxx"] = new Entry(null, "Mocking adding a new entry");
}

</script>

<template>
<div class="container mx-auto">
    <a v-for="(entry, index) in store.published" :key="entry.date" class="flex flex-row my-6 items-center bg-white border hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover max-w-xs md:h-auto" src="https://cryptoinvesting.art/img/wormhole-space.jpeg" alt="">
        <div class="flex flex-col text-left p-4 leading-normal">
            <p class="mb-2 font-normal text-gray-600 dark:text-gray-400">{{ entry.shortDate }}</p>
            <p class="text-xl font-light tracking-tight text-gray-900 dark:text-white">{{ entry.content }}</p>
        </div>
    </a>

    <RefreshIcon @click="refresh" class="w-6 float-right cursor-pointer text-slate-600"/>
</div>
</template>