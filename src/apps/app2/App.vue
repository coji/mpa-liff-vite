<script setup lang="ts">
import { useLiff } from "~/features/liff/hooks/useLiff"
import DevtoolPanel from "~/features/devtools/components/DevtoolPanel.vue"
import { getAppConfig } from "~/utils/app-config"
import message from "./assets/text.json"

const config = getAppConfig({ appId: "app2" })
const { profile } = useLiff(config.liff.liffId, { isMock: true })
</script>

<template>
  <h1 class="text-4xl text-blue-500">Example app!</h1>
  <div>
    {{ message.greeting }}
  </div>

  <div v-if="profile">Your name is {{ profile.displayName }}</div>

  <DevtoolPanel :inspection="{ config: config, profile: { profile } }" />
</template>
