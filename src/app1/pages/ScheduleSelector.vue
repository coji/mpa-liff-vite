<script setup lang="ts">
import { ref } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppWeekSelector from "../components/AppWeekSelector.vue"

const choice1 = ref<string>()
</script>

<template>
  <div>
    <AppHeading>第1希望</AppHeading>
    <div class="text-2xs">ご希望の日時を選択してください。</div>
    <AppWeekSelector name="firstChoice" />

    <AppHeading>第2希望</AppHeading>
    <div class="text-red-500 text-2xs">（第2希望も必ずご選択ください。）</div>
    <AppWeekSelector name="secondChoice" />
  </div>
</template>
