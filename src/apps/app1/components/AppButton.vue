<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits<{
  (event: "click", value: MouseEvent): void
}>()

const isClicked = ref<boolean>(false)
const handleClick = (e: MouseEvent) => {
  isClicked.value = true
  setTimeout(() => {
    emit("click", e)
  }, 500)
}
</script>

<template>
  <button
    class="inline-block w-20 h-8 font-bold text-white rounded-md border-0 btn"
    style="background: linear-gradient(to bottom, #ef7393 0%, #d24b6d 100%)"
    :class="{ 'contrast-150': isClicked }"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
