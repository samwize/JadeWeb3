<script setup>
import PrimaryButton from '/src/uikit/PrimaryButton.vue';
import { ArchiveIcon } from '@heroicons/vue/solid';
import Arweave from 'arweave';
const arweave = Arweave.init({});

// Log the balances
let addr = 'VGzC9fXmqcQ3kzQERemI4Fue1u2mccC2eFrm8Fc-Y5U';
arweave.wallets.getBalance(addr).then((balance) => {
    let winston = balance;
    let ar = arweave.ar.winstonToAr(balance);
    console.log("winston", winston);
    console.log("AR", ar);
});

async function test() {
  // The transaction
  let buf = Arweave.utils.stringToBuffer('Some data');
  let transaction = await arweave.createTransaction({
      data: buf
  });

  // Tags
  transaction.addTag('DataType', 'entry');
  transaction.addTag('Algo', 'RSA');
  transaction.addTag('Keys', 'x,y,z');
  transaction.addTag('Wallets', 'x1,y1,z1');
  console.log(transaction);

  // Sign it
  // await arweave.transactions.sign(transaction);

  // // Upload
  // let uploader = await arweave.transactions.getUploader(transaction);
  // while (!uploader.isComplete) {
  //   await uploader.uploadChunk();
  //   console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
  // }
}

</script>

<template>
  <h1 class="text-3xl font-bold underline pt-10">Hello tailwind!</h1>

  <div class="flex-1 items-center">
    <ArchiveIcon class="h-10 w-10 text-green-700" />
    <img class="h-12" src="/assets/logo.png" />
    <div>
      <strong>Junda Ong</strong>
      <span>Full Slack</span>
    </div>
  </div>

  <PrimaryButton @click="test">I am a button</PrimaryButton>

  <blockquote class="text-2xl font-semibold italic text-center text-slate-900">
    When you look
    <span class="relative">
      <span class="block absolute -inset-1 -skew-y-3 bg-pink-500" aria-hidden="true"></span>
      <span class="relative text-white">annoyed</span>
    </span>
    all the time, people think that you're busy.
  </blockquote>

  <label class="relative block p-5">
    <span class="sr-only">Search</span>
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
        <!-- ... -->
      </svg>
    </span>
    <input
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      placeholder="Search for anything..."
      type="text"
      name="search"
    />
  </label>

  <label class="block">
    <span class="sr-only">Select photo</span>
    <input
      type="file"
      class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
    />
  </label>

  <!-- Full-width fluid until the `md` breakpoint, then lock to container -->
  <div class="md:container md:mx-auto">
    <div class="text-left bg-slate-500">
      <p>Hello</p>
    </div>
  </div>
</template>