<script setup lang="ts">
import { onMounted, ref } from "vue"
// import Liff from "@line/liff"
// import apps from "~/apps.json"

import { useLinearRouter } from "~/features/router/hooks/useLinearRouter"
import BackButton from "~/features/router/components/BackButton.vue"

import type { Selection } from "./interfaces/model"
import { useShopListQuery } from "./hooks/useShopListMaster"
import PrefecturePage from "./pages/PrefecturePage.vue"
import ShopPage from "./pages/ShopPage.vue"
import SchedulePage from "./pages/SchedulePage.vue"

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
  console.log("schedule choiced", firstChoice, secondChoice)
}
</script>

<template>
  <div class="min-h-screen">
    <BackButton :router="router" class="text-pink-400 hover:text-pink-600" />

    <div v-if="data" class="m-4">
      <PrefecturePage v-if="router.current.value === 'prefecture'" :shoplist="data" @select="handleSelectPrefecture" />

      <ShopPage
        v-if="router.current.value === 'shop'"
        :prefecture="selection.prefecture"
        :shoplist="data[selection.region][selection.prefecture]"
        :selection="selection"
        @select="handleSelectShop"
      />

      <SchedulePage v-if="router.current.value === 'schedule'" :selection="selection" @select="handleScheduleChoice" />

      <div v-if="router.current.value === 'done'">
        <h1 class="text-xl font-bold text-pink-400">開発テスト表示: 以下の内容で登録されます。</h1>
        <div class="p-8 text-center bg-slate-200">
          <div class="mx-auto shadow stats stats-vertical">
            <div class="stat">
              <div class="stat-title">希望店舗</div>
              <div class="stat-value">{{ selection.shop }}</div>
            </div>

            <div class="stat">
              <div class="stat-title">人数</div>
              <div class="stat-value">{{ selection.member }}</div>
            </div>

            <div class="stat">
              <div class="stat-title">第１希望日時</div>
              <div class="stat-value">{{ selection.firstChoice }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">第２希望日時</div>
              <div class="stat-value">{{ selection.secondChoice }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
