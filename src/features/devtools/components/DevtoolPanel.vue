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
  isEnabled.value = searchParams.get("debug") === "1" // debug=1 で有効に
})
</script>

<template>
  <div
    v-if="isEnabled"
    class="inline-block fixed cursor-pointer"
    :class="{ 'bottom-0': isOpen, 'bottom-2': !isOpen, 'left-0': isOpen, 'left-2': !isOpen, 'right-0': isOpen }"
  >
    <div
      v-if="isOpen"
      class="grid overflow-scroll grid-cols-1 gap-4 p-4 h-2/5 text-white bg-slate-900/90"
      @click="isOpen = false"
    >
      <InsectorBlock
        v-for="key of Object.keys(inspection)"
        :key="key"
        :inspection-key="key"
        :inspection-value="inspection[key]"
      />
      <InsectorBlock v-if="params" inspection-key="URL Parameters" :inspection-value="params" />
    </div>

    <div v-else class="inline-block p-2 text-xs font-bold text-white bg-slate-900/90 rounded-md" @click="isOpen = true">
      Debug
    </div>
  </div>
</template>
