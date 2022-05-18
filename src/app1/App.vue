<script setup lang="ts">
import { onMounted, ref } from "vue"
// import Liff from "@line/liff"
// import apps from "~/apps.json"
import { useLinearRouter } from "~/features/router/hooks/useLinearRouter"
import BackButton from "~/features/router/components/BackButton.vue"

import AppHeading from "./components/AppHeading.vue"
import type { Selection } from "./interfaces/model"
import { useShopListQuery } from "./hooks/useShopListMaster"
import PrefecturePage from "./pages/PrefecturePage.vue"
import ShopPage from "./pages/ShopPage.vue"
import MemberPage from "./pages/MemberPage.vue"
import SchedulePage from "./pages/SchedulePage.vue"
import ConfirmPage from "./pages/ConfirmPage.vue"

const router = useLinearRouter({
  routing: ["prefecture", "shop", "member", "schedule", "confirm", "done"]
})

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
  if (selection.value.prefecture !== prefecture) selection.value.shop = "" // バックで戻ってきたとき別の都道府県を選択したら店舗選択をリセット
  selection.value.region = region
  selection.value.prefecture = prefecture
  router.next()
}

const handleSelectShop = ({ shop }: { shop: string }) => {
  selection.value.shop = shop
  router.next()
}

const handleSelectMember = ({ member }: { member: string }) => {
  selection.value.member = member
  router.next()
}

const handleScheduleChoice = ({ firstChoice, secondChoice }: { firstChoice: string; secondChoice: string }) => {
  selection.value.firstChoice = firstChoice
  selection.value.secondChoice = secondChoice
  router.next()
}

const handleConfirmNext = () => {
  router.next()
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

      <MemberPage v-if="router.current.value === 'member'" :selection="selection" @select="handleSelectMember" />

      <SchedulePage v-if="router.current.value === 'schedule'" :selection="selection" @select="handleScheduleChoice" />

      <ConfirmPage
        v-if="router.current.value === 'confirm'"
        :selection="selection"
        @next="handleConfirmNext"
      ></ConfirmPage>

      <div v-if="router.current.value === 'done'" class="text-center">
        <AppHeading level="1" class="mt-32 text-center">予約が完了しました。</AppHeading>
      </div>
    </div>
  </div>
</template>
