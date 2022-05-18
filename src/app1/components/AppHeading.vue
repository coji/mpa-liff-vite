<template>
  <h2 class="flex items-center text-lg font-bold" v-bind="$attrs">
    <div class="inline mr-2 w-2 h-2 bg-red-400 rounded-full"></div>
    <div class="text-red-400">
      <slot></slot>
    </div>
  </h2>
</template>
