<script setup lang="ts">
import { onMounted, ref } from "vue"
// import Liff from "@line/liff"
// import apps from "~/apps.json"
import PrefectureSelector from "./pages/PrefectureSelector.vue"
import ShopSelector from "./pages/ShopSelector.vue"
import { useShopListQuery } from "./hooks/useShopListMaster"

onMounted(async () => {
  /*
  liff.value = await Liff.init({
    liffId: (apps.app2.liffId as any)[import.meta.env.MODE],
  }).catch((e) => e)

  if (!liff.value) alert('liff init failed!')
  */
})

const { data } = useShopListQuery()
const state = ref<"prefecture" | "shop">("prefecture")
const prefecture = ref<{ region: string; prefecture: string }>()
const handleSelectPrefecture = (selection: { region: string; prefecture: string }) => {
  prefecture.value = selection
  state.value = "shop"
}
</script>

<template>
  <div class="min-h-screen">
    <div v-if="data">
      <PrefectureSelector v-if="state === 'prefecture'" :shoplist="data" @select="handleSelectPrefecture" />

      <ShopSelector
        v-if="state === 'shop' && prefecture"
        :prefecture="prefecture"
        :shoplist="data[prefecture.region][prefecture.prefecture]"
      />
    </div>
  </div>
</template>
