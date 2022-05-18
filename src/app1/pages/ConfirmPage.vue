<script setup lang="ts">
import AppHeading from "../components/AppHeading.vue"
import AppNextButton from "../components/AppNextButton.vue"
import type { Selection } from "../interfaces/model"

defineProps<{
  selection: Selection
}>()

const emit = defineEmits<{
  (event: "next"): void
}>()

const handleClickNext = () => {
  emit("next")
}
</script>

<template>
  <div class="grid grid-cols-1 gap-8">
    <AppHeading level="1">以下の内容で予約します</AppHeading>

    <div class="grid grid-cols-3 gap-2">
      <div class="p-2 font-bold text-right bg-gray-100">希望店舗</div>
      <div class="col-span-2 p-2">{{ selection.shop }}</div>

      <div class="p-2 font-bold text-right bg-gray-100">人数</div>
      <div class="col-span-2 p-2">{{ selection.member }}</div>

      <div class="p-2 font-bold text-right bg-gray-100">第1希望日時</div>
      <div class="col-span-2 p-2">{{ selection.firstChoice }}</div>

      <div class="p-2 font-bold text-right bg-gray-100">第2希望日時</div>
      <div class="col-span-2 p-2">{{ selection.secondChoice }}</div>
    </div>

    <AppNextButton @click="handleClickNext()"> 予約完了 </AppNextButton>
  </div>
</template>
