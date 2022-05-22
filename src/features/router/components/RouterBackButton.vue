<script setup lang="ts">
import { computed } from "vue"
import type { LinearRouter } from "../hooks/useLinearRouter"

const props = withDefaults(
  defineProps<{
    router: LinearRouter
    disabled?: boolean
  }>(),
  { disabled: false }
)

const disabled = computed(() => !props.router.canBack.value || props.disabled)
</script>

<template>
  <button
    :disabled="disabled"
    class="hover:contrast-150"
    :class="{ invisible: disabled }"
    v-bind="$attrs"
    @click="router.back()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-7 h-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
</template>
