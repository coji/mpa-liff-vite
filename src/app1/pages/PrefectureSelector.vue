<script setup lang="ts">
import { computed } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppButton from "../components/AppButton.vue"
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
      <AppHeading>{{ region }}</AppHeading>

      <ul class="grid grid-cols-3 gap-3">
        <li v-for="prefecture of prefectures(region)" :key="`${region}-${prefecture}`" class="block text-center">
          <AppButton @click="handleClickPrefecture(region, prefecture)"> {{ prefecture }} </AppButton>
        </li>
      </ul>
    </div>
  </div>
</template>
