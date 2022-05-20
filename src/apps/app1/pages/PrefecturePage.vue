<script setup lang="ts">
import AppHeading from "../components/AppHeading.vue"
import AppStack from "../components/AppStack.vue"
import AppButton from "../components/AppButton.vue"
import { useShopList } from "../hooks/useShopList"

const emit = defineEmits<{
  (event: "select", { prefecture }: { prefecture: string }): void
}>()
const { prefectures } = useShopList()
const handleClickPrefecture = (prefecture: string) => {
  emit("select", { prefecture })
}
</script>

<template>
  <AppStack>
    <AppHeading level="1">ご希望の都道府県を選んで下さい</AppHeading>

    <AppStack gap="4">
      <div v-for="region in Object.entries(prefectures)" :key="region[0]">
        <AppHeading level="2" class="my-2" style="color: var(--brand-color)">{{ region[0] }}</AppHeading>

        <div class="grid grid-cols-3 gap-3">
          <div v-for="prefecture of region[1]" :key="`${region}-${prefecture}`" class="block text-center">
            <AppButton @click="handleClickPrefecture(prefecture)"> {{ prefecture }} </AppButton>
          </div>
        </div>
      </div>
    </AppStack>
  </AppStack>
</template>
