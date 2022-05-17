<script setup lang="ts">
import ky from 'ky'
import HelloWorld from '../components/HelloWorld.vue'

const handleClickSayHello = async () => {
  const ret = await ky.get('/hello').text()
  alert(ret)
}
</script>

<template>
  <HelloWorld msg="Helo!" />
  <button class="btn btn-primary" @click="handleClickSayHello">
    Say hello!
  </button>
</template>
