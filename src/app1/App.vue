<script setup lang="ts">
import { ref, computed } from "vue"
import { useLinearRouter } from "~/features/router/hooks/useLinearRouter"
import RouterBackButton from "~/features/router/components/RouterBackButton.vue"
import apps from "~/apps.config.json"
import { useLiff } from "~/features/liff/hooks/useLiff"

import DevtoolPanel from "~/features/devtools/components/DevtoolPanel.vue"
import AppStack from "./components/AppStack.vue"
import AppHeading from "./components/AppHeading.vue"
import type { Selection, ShopListMaster } from "./interfaces/model"
import shoplist from "./assets/shoplist.json"

import PrefecturePage from "./pages/PrefecturePage.vue"
import ShopPage from "./pages/ShopPage.vue"
import MemberPage from "./pages/MemberPage.vue"
import SchedulePage from "./pages/SchedulePage.vue"
import ConfirmPage from "./pages/ConfirmPage.vue"

const { useLiffData, useSendMessageMutation } = useLiff(apps.app1.liffId.development)
const { mutate: sendMessageMutate } = useSendMessageMutation()
const liffData = useLiffData()

const router = useLinearRouter({
  routing: ["prefecture", "shop", "member", "schedule", "confirm", "done"]
})
const isBackDisabled = computed(() => router.current.value === "prefecture" || router.current.value === "done")

const data: ShopListMaster = shoplist

const selection = ref<Selection>({
  region: "",
  prefecture: "",
  shop: "",
  member: "",
  firstChoice: "",
  secondChoice: ""
})

// 都道府県選択
const handleSelectPrefecture = ({ region, prefecture }: { region: string; prefecture: string }) => {
  if (selection.value.prefecture !== prefecture) selection.value.shop = "" // バックで戻ってきたとき別の都道府県を選択したら店舗選択をリセット
  selection.value.region = region
  selection.value.prefecture = prefecture
  router.next()
}

// 店舗選択
const handleSelectShop = ({ shop }: { shop: string }) => {
  selection.value.shop = shop
  router.next()
}

// 人数選択
const handleSelectMember = ({ member }: { member: string }) => {
  selection.value.member = member
  router.next()
}

// 第１希望日時選択
const schedule2El = ref<InstanceType<typeof SchedulePage>>()
const handleSelectSchedule1 = (choice?: string) => {
  console.log("schedule1")
  selection.value.firstChoice = choice || ""
  setTimeout(() => {
    // router.next()
    schedule2El.value?.$el.scrollIntoView({ behavior: "smooth" })
  }, 500)
}

// 第１希望日時選択
const handleSelectSchedule2 = (choice?: string) => {
  console.log("schedule2")
  selection.value.secondChoice = choice || ""
  setTimeout(() => {
    router.next()
  }, 500)
}

// 予約登録
const handleConfirmRegister = () => {
  // ここで登録処理を行う
  sendMessageMutate("以下の内容で予約しました\n\n" + JSON.stringify(selection.value, null, 2))
  router.next()
}
</script>

<template>
  <div id="top" class="relative">
    <RouterBackButton
      :router="router"
      class="absolute top-0 left-2"
      style="color: var(--brand-color)"
      :disabled="isBackDisabled"
    />

    <div class="m-4">
      <PrefecturePage v-if="router.current.value === 'prefecture'" :shoplist="data" @select="handleSelectPrefecture" />

      <ShopPage
        v-if="router.current.value === 'shop'"
        :prefecture="selection.prefecture"
        :shoplist="data[selection.region][selection.prefecture]"
        :selection="selection"
        @select="handleSelectShop"
      />

      <MemberPage v-if="router.current.value === 'member'" :selection="selection" @select="handleSelectMember" />

      <AppStack v-if="router.current.value === 'schedule'" :gap="32">
        <SchedulePage
          heading="第1希望の日時を選択してください"
          subheading="第1希望"
          :selection="selection"
          name="firstChoice"
          @select="handleSelectSchedule1"
        />

        <SchedulePage
          ref="schedule2El"
          class="mb-40"
          heading="第2希望の日時を選択してください"
          subheading="第2希望"
          :selection="selection"
          name="secondChoice"
          @select="handleSelectSchedule2"
        />
      </AppStack>

      <ConfirmPage v-if="router.current.value === 'confirm'" :selection="selection" @next="handleConfirmRegister" />

      <div v-if="router.current.value === 'done'" class="text-center">
        <AppHeading level="1" class="mt-32 text-center">予約が完了しました。</AppHeading>
      </div>
    </div>

    <DevtoolPanel
      :inspection="{
        selection,
        liffData: liffData.data.value as object
      }"
    />
  </div>
</template>
