<script setup lang="ts">
import { ref, watchEffect } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppStack from "../components/AppStack.vue"
import AppWeekSelector from "../components/AppWeekSelector.vue"
import type { Selection } from "../interfaces/model"

defineProps<{
  selection?: Selection
}>()

const firstChoice = ref<string>()
const secondChoice = ref<string>()
const firstBlock = ref<InstanceType<typeof AppStack>>()
const secondBlock = ref<InstanceType<typeof AppStack>>()

const emit = defineEmits<{
  (event: "select", { firstChoice, secondChoice }: { firstChoice: string; secondChoice: string }): void
}>()

watchEffect(() => {
  if (firstChoice.value && secondChoice.value) {
    // 両方選択されたら次へ
    emit("select", { firstChoice: firstChoice.value, secondChoice: secondChoice.value })
  } else if (firstChoice.value && !secondChoice.value) {
    // first のみで second がまだなら second にスクロール
    setTimeout(() => {
      secondBlock.value?.$el.scrollIntoView({ behavior: "smooth" })
    }, 500)
  } else if (!firstChoice.value && secondChoice.value) {
    // second のみで first がまだなら first にスクロール
    setTimeout(() => {
      firstBlock.value?.$el.scrollIntoView({ behavior: "smooth" })
    }, 500)
  }
})
</script>

<template>
  <AppStack>
    <AppHeading level="1">ご希望の日時を選択してください</AppHeading>

    <AppStack ref="firstBlock" gap="2" class="mb-16">
      <div class="flex gap-4 items-center">
        <AppHeading level="2" style="color: var(--brand-color)">第1希望</AppHeading>
        <div class="text-gray-600">{{ firstChoice || "未選択" }}</div>
      </div>

      <AppWeekSelector v-model="firstChoice" name="firstChoice" />
    </AppStack>

    <AppStack ref="secondBlock" gap="2" class="mb-16">
      <div class="flex gap-4 items-center">
        <AppHeading level="2" style="color: var(--brand-color)">第2希望</AppHeading>
        <div class="text-gray-600">{{ secondChoice || "未選択" }}</div>
      </div>
      <AppWeekSelector v-model="secondChoice" name="secondChoice" />
    </AppStack>
  </AppStack>
</template>
