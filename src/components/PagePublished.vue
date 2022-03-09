<script setup>

import { onMounted, computed } from "@vue/runtime-core";
import * as ArweaveKit from '/src/utils/arweavekit.js';
import { store, Entry } from '/src/store.js';

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
    <a v-for="(entry, index) in store.published" :key="entry.date" href="#" class="flex flex-row my-4 items-center bg-white rounded-lg border shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover max-w-xs rounded-t-lg md:h-auto rounded-none rounded-l-lg" src="https://cryptoinvesting.art/img/wormhole-space.jpeg" alt="">
        <div class="flex flex-col text-left p-4 leading-normal">
            <p class="mb-2 font-normal text-gray-600 dark:text-gray-400">{{ entry.shortDate }}</p>
            <p class="text-xl font-light tracking-tight text-gray-900 dark:text-white">{{ entry.content }}</p>
        </div>
    </a>

    <button @click="refresh">Refresh</button>
</div>
</template>