<script setup lang="ts">
import AppCheckMark from "../components/AppCheckMark.vue"
</script>

<template>
  <button
    class="block text-lg font-bold text-white bg-gradient-to-b from-green-400 to-green-800 rounded-md border-0 btn"
    v-bind="$attrs"
  >
    <slot></slot> <AppCheckMark />
  </button>
</template>
