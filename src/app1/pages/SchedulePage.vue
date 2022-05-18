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
        <AppHeading level="1">第1希望</AppHeading>
      </div>
      <AppWeekSelector v-model="firstChoice" name="firstChoice" />
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div>
        <AppHeading level="1">第2希望</AppHeading>
      </div>
      <AppWeekSelector v-model="secondChoice" name="secondChoice" />
    </div>

    <AppWarning v-if="isError">第1希望、第2希望両方の選択が必要です。</AppWarning>

    <AppNextButton @click="handleClickNext()"> 予約確認 </AppNextButton>
  </div>
</template>
