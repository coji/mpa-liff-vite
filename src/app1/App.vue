<script setup lang="ts">
import { onMounted, ref } from "vue"
// import Liff from "@line/liff"
// import apps from "~/apps.json"

import { useLinearRouter } from "~/features/router/hooks/useLinearRouter"
import BackButton from "~/features/router/components/BackButton.vue"

import { useShopListQuery } from "./hooks/useShopListMaster"
import PrefectureSelector from "./pages/PrefectureSelector.vue"
import ShopSelector from "./pages/ShopSelector.vue"

const router = useLinearRouter({ routing: ["prefecture", "shop", "schedule", "done"] })

onMounted(async () => {
  /*
  liff.value = await Liff.init({
    liffId: (apps.app2.liffId as any)[import.meta.env.MODE],
  }).catch((e) => e)

  if (!liff.value) alert('liff init failed!')
  */
})

const { data } = useShopListQuery()

const prefecture = ref<{ region: string; prefecture: string }>()
const handleSelectPrefecture = (selection: { region: string; prefecture: string }) => {
  prefecture.value = selection
  router.next()
}

const shop = ref<{ shop: string; num: string }>()
const handleSelectShop = (selection: { shop: string; num: string }) => {
  shop.value = selection
  router.next()
}
</script>

<template>
  <div class="min-h-screen">
    <BackButton :router="router" class="text-red-400" />

    <div v-if="data" class="px-4">
      <PrefectureSelector
        v-if="router.current.value === 'prefecture'"
        :shoplist="data"
        @select="handleSelectPrefecture"
      />

      <ShopSelector
        v-if="router.current.value === 'shop' && prefecture"
        :prefecture="prefecture"
        :shoplist="data[prefecture.region][prefecture.prefecture]"
        :selection="shop"
        @select="handleSelectShop"
      />

      <div v-if="router.current.value === 'schedule'">
        スケジュール
        {{ shop }}
      </div>
      <div v-if="router.current.value === 'done'">完了</div>
    </div>
  </div>
</template>
