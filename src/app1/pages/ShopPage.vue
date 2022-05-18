<script setup lang="ts">
import AppHeading from "../components/AppHeading.vue"
import AppButton from "../components/AppButton.vue"
import type { Selection, Shop } from "../interfaces/model"

defineProps<{
  shoplist: Shop[]
  selection?: Selection
}>()

const emit = defineEmits<{
  (event: "select", { shop }: { shop: string }): void
}>()

const handleClickShop = (name: string) => {
  emit("select", { shop: name })
}
</script>

<template>
  <div class="grid grid-cols-1 gap-8">
    <AppHeading level="1">ご希望の店舗を選択してください</AppHeading>

    <div class="grid grid-cols-1 gap-3">
      <div v-for="shop of shoplist" :key="shop.name" class="block text-center">
        <AppButton class="w-full" name="shop" @click="handleClickShop(shop.name)">{{ shop.name }}</AppButton>
      </div>
    </div>
  </div>
</template>
