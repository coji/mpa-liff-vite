<script setup lang="ts">
import { ref } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppNextButton from "../components/AppNextButton.vue"
import AppWeekSelector from "../components/AppWeekSelector.vue"

const firstChoice = ref<string>()

const emit = defineEmits<{
  (event: "select", { firstChoice, secondChoice }: { firstChoice: string; secondChoice: string }): void
}>()

const handleClickNext = () => {
  if (firstChoice.value) {
    emit("select", { firstChoice: firstChoice.value, secondChoice: firstChoice.value })
  } else {
    // error
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-8 m-4">
    <div class="grid grid-cols-1 gap-4">
      <div>
        <AppHeading>第1希望</AppHeading>
        <div class="text-2xs">ご希望の日時を選択してください。</div>
      </div>
      <AppWeekSelector name="firstChoice" />
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div>
        <AppHeading>第2希望</AppHeading>
        <div class="text-red-500 text-2xs">（第2希望も必ずご選択ください。）</div>
      </div>
      <AppWeekSelector name="secondChoice" />
    </div>

    <AppNextButton @click="handleClickNext()"> 希望日時の入力に進む </AppNextButton>
  </div>
</template>
