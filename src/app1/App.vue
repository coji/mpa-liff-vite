<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ky from 'ky'
import Liff from '@line/liff'
import apps from '~/../apps.json'
import HelloWorld from '~/components/HelloWorld.vue'

const message = ref()
const error = ref()
const liff = ref()

onMounted(async () => {
  liff.value = await Liff.init({
    liffId: (apps.app2.liffId as any)[import.meta.env.MODE],
  }).catch((e) => e)

  if (!liff.value) alert('liff init failed!')
})

const handleClickSayHello = async () => {
  const ret = await ky.get('/hello').text()
  alert(ret)
}
</script>

<template>
  <HelloWorld msg="Helo!" />

  <div class="text-red-500">hello!</div>

  <button class="btn btn-primary" @click="handleClickSayHello">
    Say hello!
  </button>
</template>
