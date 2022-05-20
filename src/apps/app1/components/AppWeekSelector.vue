<script setup lang="ts">
import { ref, computed, watchEffect } from "vue"
import dayjs from "~/utils/dayjs"

const props = defineProps<{
  modelValue?: string
  name: string
}>()

const emit = defineEmits<{
  (event: "update:modelValue", value?: string): void
}>()

const choice = ref<string>()
const startAt = ref<0 | 7>(0) // 0: 最初の7日、1: 次の7日
const dayStart = computed(() => dayjs().add(1 + startAt.value, "day"))
const days = computed(() => new Array(7).fill(0).map((_, i) => dayStart.value.add(i, "day")))
watchEffect(() => {
  choice.value = props.modelValue
})

watchEffect(() => {
  emit("update:modelValue", choice.value)
})

const timeSlots = [
  { startAt: "12:00", endAt: "14:00" },
  { startAt: "14:00", endAt: "16:00" },
  { startAt: "16:00", endAt: "18:00" },
  { startAt: "18:00", endAt: "20:00" },
  { startAt: "19:00", endAt: "21:00" }
]

const choiceFormat = (day: dayjs.Dayjs, startAt: string, endAt: string) =>
  `${day.format("YYYY/MM/DD(ddd)")}${startAt}〜${endAt}`
</script>

<template>
  <div class="flex justify-between">
    <button
      class="rounded-none border-none btn btn-sm"
      :style="{ 'background-color': startAt === 0 ? undefined : 'var(--brand-color-light)' }"
      :disabled="startAt === 0"
      @click="startAt = 0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      前の7日
    </button>
    <button
      class="rounded-none border-none btn btn-sm"
      :style="{ 'background-color': startAt === 7 ? undefined : 'var(--brand-color-light)' }"
      :disabled="startAt === 7"
      @click="startAt = 7"
    >
      次の7日
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  <div class="grid w-full text-center" style="grid-template-columns: 3.25rem repeat(7, minmax(0, 1fr))">
    <!-- 日付行 -->
    <div class="bg-gray-100 border">&nbsp;</div>
    <div
      v-for="day of days"
      :key="day.toString()"
      class="py-2 text-sm leading-5 bg-gray-100 border"
      :class="{
        'text-red-500': day.day() === 0,
        'text-blue-500': day.day() === 6
      }"
    >
      <div>{{ day.format("M/D") }}</div>
      <div>
        <small>{{ day.format("(ddd)") }}</small>
      </div>
    </div>

    <template v-for="(slot, slotIndex) of timeSlots" :key="slot.startAt">
      <div class="flex justify-center items-center py-2 font-semibold leading-4 border text-2xs">
        {{ slot.startAt }}〜<br />{{ slot.endAt }}
      </div>
      <div
        v-for="(day, dayIndex) of days"
        :key="day.toString()"
        class="flex relative items-stretch leading-4 border transition-colors duration-500"
        :style="{
          'background-color': choice === choiceFormat(day, slot.startAt, slot.endAt) ? 'var(--brand-color-dark)' : ''
        }"
      >
        <input
          :id="`t1-${name}-${slotIndex}-${dayIndex}`"
          v-model="choice"
          type="radio"
          :name="name"
          class="hidden"
          :value="choiceFormat(day, slot.startAt, slot.endAt)"
          :checked="choice === choiceFormat(day, slot.startAt, slot.endAt)"
        />
        <label class="flex flex-1 justify-center items-center" :for="`t1-${name}-${slotIndex}-${dayIndex}`"> </label>
      </div>
    </template>
  </div>
  <div class="text-center">{{ choice }}</div>
</template>

<style scoped>
input[type="radio"] + label:before {
  content: "";
  width: 20px;
  height: 20px;
  border: solid 2px #d24b6d;
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  border-radius: 100%;
}

input[type="radio"]:checked + label:before {
  border: solid 2px #ffffff;
}

input[type="radio"]:checked + label:after {
  content: "";
  width: 5px;
  height: 10px;
  border-right: solid 2px #ffffff;
  border-bottom: solid 2px #ffffff;
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -2.5px;
  margin-top: -5px;
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
