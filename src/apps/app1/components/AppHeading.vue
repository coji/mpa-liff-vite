<script setup lang="ts">
withDefaults(
  defineProps<{
    level?: string
  }>(),
  { level: "1" }
)
</script>

<template>
  <h1 v-if="level === '1'" class="text-xl font-bold text-center" v-bind="$attrs">
    <slot></slot>
  </h1>

  <h2 v-if="level === '2'" class="text-lg font-bold text-center" v-bind="$attrs">
    <slot></slot>
  </h2>
</template>
