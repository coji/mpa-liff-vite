<script setup lang="ts">
withDefaults(
  defineProps<{
    gap?: number | string
  }>(),
  { gap: 6 }
)
</script>

<template>
  <div
    class="grid grid-cols-1"
    :class="{
      // PostCSSにパージされないように、リテラルを列挙する
      'gap-0': gap == 0,
      'gap-0.5': gap == 0.5,
      'gap-1': gap == 1,
      'gap-2': gap == 2,
      'gap-3': gap == 3,
      'gap-4': gap == 4,
      'gap-5': gap == 5,
      'gap-6': gap == 6,
      'gap-7': gap == 7,
      'gap-8': gap == 8
    }"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
