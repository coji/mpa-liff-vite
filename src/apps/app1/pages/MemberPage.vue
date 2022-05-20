<script setup lang="ts">
import { ref, watchEffect } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppButton from "../components/AppButton.vue"
import AppStack from "../components/AppStack.vue"
import type { Selection } from "../interfaces/model"

const props = defineProps<{
  selection?: Selection
}>()

const selectedMember = ref<string>("1")
watchEffect(() => {
  if (props.selection) {
    // 戻ってきたときなどで選択済みにしとく
    selectedMember.value = props.selection.member || "1名"
  }
})

const emit = defineEmits<{
  (event: "select", { member }: { member: string }): void
}>()

const handleClickMember = (member: string) => {
  emit("select", { member })
}
</script>

<template>
  <AppStack>
    <AppHeading level="1">ご来店人数を選択してください</AppHeading>

    <div class="grid grid-cols-1 gap-3">
      <AppButton v-for="i of [1, 2, 3]" :key="i" class="w-full" @click="handleClickMember(`${i}名`)">
        {{ i }}名
      </AppButton>
    </div>
  </AppStack>
</template>
