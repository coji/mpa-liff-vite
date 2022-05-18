<script setup lang="ts">
import { computed } from "vue"
import type { useLinearRouter } from "../hooks/useLinearRouter"

type LinearRouter = ReturnType<typeof useLinearRouter>
const props = defineProps<{
  router: LinearRouter
}>()

const disabled = computed(() => !props.router.canBack.value)
</script>

<template>
  <button v-bind="$attrs" :disabled="disabled" :class="{ hidden: disabled }" @click="router.back()">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>
