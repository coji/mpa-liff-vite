<script setup lang="ts">
import { ref, watchEffect } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppStack from "../components/AppStack.vue"
import AppWeekSelector from "../components/AppWeekSelector.vue"
import type { Selection } from "../interfaces/model"

const props = defineProps<{
  heading: string
  subheading: string
  selection?: Selection
}>()

const choice = ref<string>()
watchEffect(() => {
  if (props.selection) {
    // 戻ってきたときなどで選択済みにしとく
    //choice.value = props.selection.firstChoice
    // secondChoice.value = props.selection.secondChoice
  }
})
const emit = defineEmits<{
  (event: "select", choice?: string): void
}>()
watchEffect(() => {
  if (choice.value) {
    emit("select", choice.value)
  }
})
</script>

<template>
  <AppStack>
    <AppHeading level="1">{{ heading }}</AppHeading>

    <AppStack gap="2">
      <AppHeading level="2" style="color: var(--brand-color-light)">{{ subheading }}</AppHeading>
      <AppWeekSelector v-model="choice" name="choice" />
    </AppStack>
  </AppStack>
</template>
