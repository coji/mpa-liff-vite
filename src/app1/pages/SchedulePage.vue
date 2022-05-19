<script setup lang="ts">
import { ref, watchEffect } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppStack from "../components/AppStack.vue"
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
  <AppStack>
    <AppHeading level="1">ご希望の日時を選択してください</AppHeading>

    <AppStack gap="2">
      <AppHeading level="2" style="color: var(--brand-color-light)">第1希望</AppHeading>
      <AppWeekSelector v-model="firstChoice" name="firstChoice" />
    </AppStack>

    <AppStack gap="2">
      <AppHeading level="2" style="color: var(--brand-color-light)">第2希望</AppHeading>
      <AppWeekSelector v-model="secondChoice" name="secondChoice" />
    </AppStack>

    <AppWarning v-if="isError">第1希望、第2希望両方の選択が必要です。</AppWarning>

    <AppNextButton @click="handleClickNext()"> 予約確認 </AppNextButton>
  </AppStack>
</template>
