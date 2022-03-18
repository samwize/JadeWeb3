<script setup>

import { onMounted, computed } from "@vue/runtime-core";
import * as ArweaveKit from '/src/utils/arweavekit.js';
import { store, Entry } from '/src/store.js';
import { RefreshIcon, LightningBoltIcon } from '@heroicons/vue/outline';

onMounted(() => {
    // ArweaveKit.fetchTransactions()
})

// unused
// const entries = computed(() => {
//     store.published.sort((x, y) => x.date - y.date);
// });

function refresh() {
    ArweaveKit.fetchTransactions()
}

function test() {
    console.log(store);
    store.published["mock"] = new Entry(null, "Mocking a new entry", ["https://cryptoinvesting.art/img/wormhole-space.jpeg"]);
}

</script>

<template>
<div class="container mx-auto">
    <a v-for="(entry, index) in store.published" :key="entry.date" class="flex flex-row my-6 items-center bg-white border hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-2/12 md:h-auto" :src="entry.firstPhoto" alt="">
        <div class="flex flex-col text-left p-4 leading-normal">
            <p class="mb-2 font-normal text-gray-600 dark:text-gray-400">{{ entry.shortDate }}</p>
            <p class="text-xl font-light tracking-tight text-gray-900 dark:text-white">{{ entry.content }}</p>
        </div>
    </a>

    <RefreshIcon @click="refresh" class="w-6 float-right cursor-pointer text-slate-600"/>
    <LightningBoltIcon @click="test" class="w-6 mx-4 float-right cursor-pointer text-slate-600"/>
</div>
</template>