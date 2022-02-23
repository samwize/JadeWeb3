<script setup>
import { ref } from 'vue'
import PrimaryButton from './PrimaryButton.vue';

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <PrimaryButton @click="count++">count is: {{ count }}</PrimaryButton>  
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
