<script setup lang="ts">
import { ref, computed } from "vue"
const props = defineProps<{
  inspectionKey: string
  inspectionValue: object
}>()

const json = computed(() => JSON.stringify(props.inspectionValue, null, 2))

const isCopied = ref<boolean>(false)
const handleClickCopy = async (text: string) => {
  await navigator.clipboard.writeText(text)
  isCopied.value = true

  setTimeout(() => {
    isCopied.value = false
  }, 5000)
}
</script>

<template>
  <div>
    <div class="flex items-center text-sm font-bold capitalize">
      <div class="flex-1">{{ inspectionKey }}</div>
      <button
        class="py-0 my-1 text-xs btn btn-xs"
        :class="{ 'text-slate-400': !isCopied, 'text-slate-100': isCopied }"
        @click="handleClickCopy(json)"
      >
        <svg
          v-if="isCopied"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1 w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1 w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <span v-if="isCopied">Copied</span>
        <span v-else>Copy</span>
      </button>
    </div>
    <div
      class="overflow-auto p-2 max-h-40 text-xs whitespace-pre bg-slate-900/70 rounded-md border border-white cursor-auto"
      @touch.stop
    >
      {{ json }}
    </div>
  </div>
</template>
