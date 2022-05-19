<script setup lang="ts">
import { computed } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppStack from "../components/AppStack.vue"
import AppButton from "../components/AppButton.vue"
import type { ShopListMaster } from "../interfaces/model"

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
  <AppStack>
    <AppHeading level="1">ご希望の都道府県を選んで下さい</AppHeading>

    <AppStack gap="4">
      <div v-for="region in regions" :key="region">
        <AppHeading level="2" class="my-2" style="color: var(--brand-color)">{{ region }}</AppHeading>

        <div class="grid grid-cols-3 gap-3">
          <div v-for="prefecture of prefectures(region)" :key="`${region}-${prefecture}`" class="block text-center">
            <AppButton @click="handleClickPrefecture(region, prefecture)"> {{ prefecture }} </AppButton>
          </div>
        </div>
      </div>
    </AppStack>
  </AppStack>
</template>
