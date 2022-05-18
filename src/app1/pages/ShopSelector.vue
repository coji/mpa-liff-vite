<script setup lang="ts">
import { ref, watchEffect } from "vue"
import AppHeading from "../components/AppHeading.vue"
import AppCheckMark from "../components/AppCheckMark.vue"
import type { Selection, Shop } from "../interfaces/model"

const props = defineProps<{
  shoplist: Shop[]
  selection?: Selection
}>()

const selectedShop = ref<string>()
const selectedNum = ref<string>("1")
watchEffect(() => {
  if (props.selection) {
    // 戻ってきたときなどで選択済みにしとく
    selectedShop.value = props.selection.shop
    selectedNum.value = props.selection.num || "1"
  }
})

const emit = defineEmits<{
  (event: "select", { shop, num }: { shop: string; num: string }): void
}>()
const handleClickNext = () => {
  if (selectedShop.value && selectedNum.value) {
    emit("select", { shop: selectedShop.value, num: selectedNum.value })
  } else {
    // error
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-8 m-4">
    <div>
      <AppHeading level="2">店舗選択</AppHeading>
      <div class="text-xs text-slate-500">ご希望の店舗を選択してください。</div>
      <div class="grid grid-cols-4 gap-3">
        <div v-for="shop of shoplist" :key="shop.name" class="block text-center">
          <input
            :id="shop.name"
            v-model="selectedShop"
            type="radio"
            name="shop"
            class="checked:text-blue-500 w-30"
            :value="shop.name"
            :checked="shop.name === selectedShop"
          />
          <label :for="shop.name"> {{ shop.name }} </label>
        </div>
      </div>
    </div>

    <div>
      <AppHeading level="2">ご来店人数</AppHeading>
      <div class="text-xs text-slate-500">ご来店人数を選択してください。</div>
      <div class="grid grid-cols-3 gap-3">
        <div v-for="i of [1, 2, 3]" :key="i" class="block text-center">
          <input
            :id="`num-of-person-${i}`"
            v-model="selectedNum"
            type="radio"
            name="num"
            class="w-30 chekckbox"
            :value="`${i}`"
            :checked="`${i}` === selectedNum"
          />
          <label :for="`num-of-person-${i}`">{{ i }} 人</label>
        </div>
      </div>
    </div>

    <button
      class="block text-lg font-bold text-white bg-gradient-to-b from-green-400 to-green-800 rounded-md border-0 btn"
      @click="handleClickNext()"
    >
      希望日時の入力に進む <AppCheckMark />
    </button>
  </div>
</template>
