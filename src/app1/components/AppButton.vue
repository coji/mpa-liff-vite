<template>
  <button
    v-bind="$attrs"
    class="inline-block w-20 font-bold text-white bg-gradient-to-b from-red-400 to-red-600 rounded-md border-0 btn"
  >
    <slot></slot>
  </button>
</template>
