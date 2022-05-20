<script setup lang="ts">
import { computed } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppStack from "../components/AppStack.vue"
import AppButton from "../components/AppButton.vue"
import type { Selection } from "../interfaces/model"
import { useShopList } from "../hooks/useShopList"

const props = defineProps<{
  prefecture: string
  selection?: Selection
}>()

const prefecture = computed(() => props.prefecture)
const { shops } = useShopList(prefecture)

const emit = defineEmits<{
  (event: "select", { shop }: { shop: string }): void
}>()
const handleClickShop = (name: string) => {
  emit("select", { shop: name })
}
</script>

<template>
  <AppStack>
    <AppHeading level="1">ご希望の店舗を選択してください</AppHeading>

    <div class="grid grid-cols-1 gap-3">
      <div v-for="shop of shops" :key="shop.name" class="block text-center">
        <AppButton class="w-full" name="shop" @click="handleClickShop(shop.name)">{{ shop.name }}</AppButton>
      </div>
    </div>
  </AppStack>
</template>
