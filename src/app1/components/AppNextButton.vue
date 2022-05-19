<script setup lang="ts">
import AppNextCircleMark from "../components/AppNextCircleMark.vue"
</script>

<template>
  <button
    class="block relative text-lg font-bold text-white bg-gradient-to-b from-green-400 to-green-800 rounded-md border-0 btn"
    v-bind="$attrs"
  >
    <slot></slot> <AppNextCircleMark class="absolute right-4" />
  </button>
</template>
