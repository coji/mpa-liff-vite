<script setup lang="ts">
import type { Shop } from "../hooks/useShopListMaster"

defineProps<{
  prefecture: { region: string; prefecture: string }
  shoplist: Shop[]
}>()

//const emit = defineEmits<{ (event: "back"): void }>()
</script>

<template>
  shops! {{ prefecture }}

  {{ shoplist }}
</template>
