<script setup lang="ts">
import { ref, onMounted } from "vue"
import { LiffProfile } from "~/features/liff/hooks/useLiff"

defineProps<{
  profile?: LiffProfile
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
    <div v-if="isOpen" class="overflow-scroll p-4 h-64 text-xs text-white bg-slate-800/80" @click="isOpen = false">
      <div class="font-bold">URL Parameters</div>
      <div class="overflow-scroll p-1 whitespace-pre border border-white cursor-auto" @click.stop>
        {{ JSON.stringify(params, null, 2) }}
      </div>

      <div class="font-bold">LINE Profile</div>
      <div class="overflow-scroll p-1 whitespace-pre border border-white cursor-auto" @click.stop>
        {{ JSON.stringify(profile, null, 2) }}
      </div>
    </div>

    <div v-else class="inline-block p-2 text-xs font-bold text-white bg-slate-800/80 rounded-md" @click="isOpen = true">
      Debug
    </div>
  </div>
</template>
