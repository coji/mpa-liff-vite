<script setup lang="ts">
import dayjs from "~/utils/dayjs"

const dayStart1 = dayjs().add(1, "day")
const dayStart2 = dayjs().add(1, "day")
</script>

<template>
  <div>
    <h1>第1希望</h1>
    <div>ご希望の日時を選択してください。</div>
    <div>
      <div>前の7日</div>
      <div>次の7日</div>
    </div>
    <div>
      {{ dayStart1 }}
    </div>

    <h1>第2希望</h1>
    <div>(第2希望は設定いただかなくても先に進んでいただけます。)</div>
    <div>
      <div>前の7日</div>
      <div>次の7日</div>
    </div>
    <div>
      {{ dayStart2 }}
    </div>
  </div>
</template>
