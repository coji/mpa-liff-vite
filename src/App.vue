<script setup lang="ts">
import apps from "~/apps.json"

const handleClick = (app: string) => {
  location.href = `/${app}/`
}
</script>

<template>
  <h1>Apps</h1>

  <button v-for="app of Object.keys(apps)" :key="app" class="btn btn-primary" @click="handleClick(app)">
    {{ app }}
  </button>
</template>
