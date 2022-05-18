<template>
  <button
    v-bind="$attrs"
    class="inline-block w-20 font-bold text-white bg-gradient-to-b from-red-300 to-red-400 rounded-md border-0 btn"
  >
    <slot></slot>
  </button>
</template>
