<template>
  <button
    v-bind="$attrs"
    class="inline-block w-20 h-8 font-bold text-white rounded-md border-0 btn"
    style="background: linear-gradient(to bottom, #ef7393 0%, #d24b6d 100%); border: solid 2px rgba(210, 75, 109, 1)"
  >
    <slot></slot>
  </button>
</template>
