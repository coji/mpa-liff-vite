<script setup lang="ts">
import { onMounted, ref } from "vue"
// import Liff from "@line/liff"
// import apps from "~/apps.json"

import { useLinearRouter } from "~/features/router/hooks/useLinearRouter"
import BackButton from "~/features/router/components/BackButton.vue"

import type { Selection } from "./interfaces/model"
import { useShopListQuery } from "./hooks/useShopListMaster"
import PrefectureSelector from "./pages/PrefectureSelector.vue"
import ShopSelector from "./pages/ShopSelector.vue"
import ScheduleSelector from "./pages/ScheduleSelector.vue"

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

const selection = ref<Selection>({
  region: "",
  prefecture: "",
  shop: "",
  member: "",
  firstChoice: "",
  secondChoice: ""
})

const handleSelectPrefecture = ({ region, prefecture }: { region: string; prefecture: string }) => {
  if (selection.value.prefecture !== prefecture) {
    selection.value.shop = "" // バックで戻ってきたとき別の都道府県を選択したら店舗選択をリセット
  }
  selection.value.region = region
  selection.value.prefecture = prefecture
  router.next()
}

const handleSelectShop = ({ shop, member }: { shop: string; member: string }) => {
  selection.value.shop = shop
  selection.value.member = member
  router.next()
}

const handleScheduleChoice = ({ firstChoice, secondChoice }: { firstChoice: string; secondChoice: string }) => {
  selection.value.firstChoice = firstChoice
  selection.value.secondChoice = secondChoice
  router.next()
}
</script>

<template>
  <div class="min-h-screen">
    <BackButton :router="router" class="text-pink-400 hover:text-pink-600" />

    <div v-if="data">
      <PrefectureSelector
        v-if="router.current.value === 'prefecture'"
        :shoplist="data"
        @select="handleSelectPrefecture"
      />

      <ShopSelector
        v-if="router.current.value === 'shop'"
        :prefecture="selection.prefecture"
        :shoplist="data[selection.region][selection.prefecture]"
        :selection="selection"
        @select="handleSelectShop"
      />

      <ScheduleSelector v-if="router.current.value === 'schedule'" @select="handleScheduleChoice" />

      <div v-if="router.current.value === 'done'">完了</div>
    </div>
  </div>
</template>
