<template>
  <button
    v-bind="$attrs"
    class="inline-block w-20 font-bold text-white bg-gradient-to-b from-pink-400 to-pink-500 rounded-md border-0 btn"
  >
    <slot></slot>
  </button>
</template>
