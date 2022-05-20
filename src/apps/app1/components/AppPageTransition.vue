<script setup lang="ts">
defineProps<{
  direction: "next" | "back"
}>()
</script>

<template>
  <transition :name="direction" mode="out-in">
    <slot></slot>
  </transition>
</template>

<style scoped>
.next-enter-active,
.next-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.next-enter,
.next-leave-to {
  transform: translateX(-100vw) translateX(0px);
}

.back-enter-active,
.back-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.back-enter,
.back-leave-to {
  transform: translateX(100vw) translateX(0px);
}
</style>
