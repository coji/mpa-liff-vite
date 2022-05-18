<script setup lang="ts">
import { ref, computed } from "vue"
import dayjs from "~/utils/dayjs"

defineProps<{
  name: string
}>()

const timeSlots = [
  { startAt: "12:00", endAt: "14:00" },
  { startAt: "14:00", endAt: "16:00" },
  { startAt: "16:00", endAt: "18:00" },
  { startAt: "18:00", endAt: "20:00" },
  { startAt: "19:00", endAt: "21:00" }
]

const dayStart = dayjs().add(1, "day")
const days = computed(() => new Array(7).fill(0).map((_, i) => dayStart.add(i, "day")))
const choice = ref<string>()
</script>

<template>
  <div class="flex justify-between">
    <button class="bg-pink-400 hover:bg-pink-600 rounded-none border-none btn btn-sm" disabled>
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
    <button class="bg-pink-400 hover:bg-pink-600 rounded-none border-none btn btn-sm">
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
  <div>
    <table class="w-full text-center">
      <thead>
        <tr>
          <th class="bg-gray-100 border">&nbsp;</th>
          <th
            v-for="day of days"
            :key="day.toString()"
            class="py-2 leading-5 bg-gray-100 border"
            :class="{
              'text-red-500': day.day() === 0,
              'text-blue-500': day.day() === 6
            }"
          >
            <div>{{ day.format("M/D") }}</div>
            <div>{{ day.format("(ddd)") }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(slot, slotIndex) of timeSlots" :key="slot.startAt">
          <td class="py-2 font-bold leading-4 border text-2xs">{{ slot.startAt }}〜<br />{{ slot.endAt }}</td>
          <td v-for="(day, dayIndex) of days" :key="day.toString()" class="py-2 leading-4 border">
            <input
              :id="`t1-first-choice-${slotIndex}-${dayIndex}`"
              v-model="choice"
              type="radio"
              :name="name"
              class="checked:text-blue-500 w-30"
              :value="`${day.format('YYYY/MM/DD(ddd)')}${slot.startAt}〜${slot.endAt}`"
              :checked="choice === `${day.format('YYYY/MM/DD(ddd)')}${slot.startAt}〜${slot.endAt}`"
            />
            <label :for="`t1-first-choice-${slotIndex}-${dayIndex}`"></label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
