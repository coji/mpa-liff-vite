<script setup lang="ts">
withDefaults(
  defineProps<{
    level?: string
  }>(),
  { level: "1" }
)
</script>

<template>
  <h1 v-if="level === '1'" class="flex items-center text-xl font-bold" v-bind="$attrs">
    <div class="text-red-400">
      <slot></slot>
    </div>
  </h1>

  <h2 v-if="level === '2'" class="flex items-center text-lg font-bold" v-bind="$attrs">
    <div class="inline mr-2 w-2 h-2 bg-red-400 rounded-full"></div>
    <div class="text-red-400">
      <slot></slot>
    </div>
  </h2>
</template>
