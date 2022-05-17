<script setup lang="ts">
import { computed } from "vue"
import type { ShopListMaster } from "../hooks/useShopListMaster"

const props = defineProps<{ shoplist: ShopListMaster }>()
const emit = defineEmits<{
  (event: "select", { region, prefecture }: { region: string; prefecture: string }): void
}>()

const regions = computed(() => Object.keys(props.shoplist))
const prefectures = (region: string) => Object.keys(props.shoplist[region])

const handleClickPrefecture = (region: string, prefecture: string) => {
  emit("select", { region, prefecture })
}
</script>

<template>
  <div class="grid grid-cols-1 gap-8 m-4">
    <div v-for="region in regions" :key="region">
      <h2 class="flex items-center text-lg font-bold">
        <div class="inline mr-2 w-2 h-2 bg-red-400 rounded-full"></div>
        <div class="text-red-400">{{ region }}</div>
      </h2>

      <ul class="grid grid-cols-3 gap-3">
        <li v-for="prefecture of prefectures(region)" :key="`${region}-${prefecture}`" class="block text-center">
          <button
            class="inline-block w-20 font-bold text-white bg-gradient-to-b from-red-400 to-red-600 rounded-md border-0 btn"
            @click="handleClickPrefecture(region, prefecture)"
          >
            {{ prefecture }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
