<script setup lang="ts">
import { ref, onMounted } from "vue"
import InsectorBlock from "./InspectorBlock.vue"

defineProps<{
  inspection: { [key: string]: object }
}>()

const params = ref<object>()
const isEnabled = ref<boolean>(false)
const isOpen = ref<boolean>(false)

onMounted(() => {
  // URLパラメータを hash object に
  function paramsToObject(searchParams: URLSearchParams): object {
    const result: { [key: string]: string } = {}
    for (const [key, value] of searchParams.entries()) {
      result[key] = value
    }
    return result
  }

  const searchParams = new URLSearchParams(window.location.search)
  params.value = paramsToObject(searchParams)
  if (searchParams.get("debug") === "1") {
    isEnabled.value = true
    console.log("Debug inspector enabled")
  } // debug=1 で有効に
})
</script>

<template>
  <div
    v-if="isEnabled"
    class="inline-block fixed"
    :class="{ 'bottom-0': isOpen, 'bottom-2': !isOpen, 'left-0': isOpen, 'left-2': !isOpen, 'right-0': isOpen }"
  >
    <div
      v-if="isOpen"
      class="grid overflow-scroll grid-cols-1 gap-4 p-4 h-2/5 text-white bg-slate-900/90"
      @click.stop
      @touch.stop
    >
      <div class="flex">
        <div class="flex-1 font-bold cursor-pointer" @click="isOpen = false">Debug Inspector</div>
        <button class="btn btn-sm btn-ghost" @click="isOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <InsectorBlock
        v-for="key of Object.keys(inspection)"
        :key="key"
        :inspection-key="key"
        :inspection-value="inspection[key]"
      />
      <InsectorBlock v-if="params" inspection-key="URL Parameters" :inspection-value="params" />
    </div>

    <div
      v-else
      class="inline-block p-2 text-xs font-bold text-white bg-slate-900/90 rounded-md cursor-pointer"
      @click.stop="isOpen = true"
    >
      Debug
    </div>
  </div>
</template>
