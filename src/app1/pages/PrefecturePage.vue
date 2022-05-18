<script setup lang="ts">
import { computed } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppButton from "../components/AppButton.vue"
import type { ShopListMaster } from "../hooks/useShopListMaster"

const props = defineProps<{ shoplist: ShopListMaster }>()
const regions = computed(() => Object.keys(props.shoplist))
const prefectures = (region: string) => Object.keys(props.shoplist[region])

const emit = defineEmits<{
  (event: "select", { region, prefecture }: { region: string; prefecture: string }): void
}>()
const handleClickPrefecture = (region: string, prefecture: string) => {
  emit("select", { region, prefecture })
}
</script>

<template>
  <div>
    <AppHeading>店舗検索</AppHeading>
    <div class="text-xs text-slate-500">エリアを選択すると、選択可能な店舗が表示されます。</div>

    <div class="grid grid-cols-1 gap-8">
      <div v-for="region in regions" :key="region">
        <AppHeading level="2">{{ region }}</AppHeading>

        <ul class="grid grid-cols-3 gap-3">
          <li v-for="prefecture of prefectures(region)" :key="`${region}-${prefecture}`" class="block text-center">
            <AppButton @click="handleClickPrefecture(region, prefecture)"> {{ prefecture }} </AppButton>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
