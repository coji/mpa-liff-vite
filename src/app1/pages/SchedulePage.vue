<script setup lang="ts">
import { ref, watchEffect } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppNextButton from "../components/AppNextButton.vue"
import AppWeekSelector from "../components/AppWeekSelector.vue"
import AppWarning from "../components/AppWarning.vue"
import type { Selection } from "../interfaces/model"

const props = defineProps<{
  selection?: Selection
}>()

const firstChoice = ref<string>()
const secondChoice = ref<string>()
watchEffect(() => {
  if (props.selection) {
    // 戻ってきたときなどで選択済みにしとく
    firstChoice.value = props.selection.firstChoice
    secondChoice.value = props.selection.secondChoice
  }
})
const emit = defineEmits<{
  (event: "select", { firstChoice, secondChoice }: { firstChoice: string; secondChoice: string }): void
}>()

const isError = ref<boolean>(false)
const handleClickNext = () => {
  if (firstChoice.value && secondChoice.value) {
    isError.value = false
    emit("select", { firstChoice: firstChoice.value, secondChoice: secondChoice.value })
  } else {
    isError.value = true
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-8">
    <div class="grid grid-cols-1 gap-4">
      <div>
        <AppHeading>第1希望</AppHeading>
        <div class="text-2xs">ご希望の日時を選択してください。</div>
      </div>
      <AppWeekSelector v-model="firstChoice" name="firstChoice" />
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div>
        <AppHeading>第2希望</AppHeading>
        <div class="text-red-500 text-2xs">（第2希望も必ずご選択ください。）</div>
      </div>
      <AppWeekSelector v-model="secondChoice" name="secondChoice" />
    </div>

    <AppWarning v-if="isError">第1希望、第1希望どちらも選択必須です。</AppWarning>

    <AppNextButton @click="handleClickNext()"> 希望日時の入力に進む </AppNextButton>
  </div>
</template>
