<script setup lang="ts">
import type { NuxtError } from '#app'
const router = useRouter()
const props = defineProps({
  error: Object as () => NuxtError
})

setTimeout(()=>{
    //router.push('/')
}, 5000)

</script>

<template>
  <div class="flex justify-center items-center flex-col w-screen h-screen overflow-y-auto text-center" style="color:#040679;">
    <h1 class="font-bold text-7xl">{{ error.statusCode }}</h1>

    <img src="/img/404.svg" alt="Errooooor 404" class="w-3/4 max-w-80">
    <div class="font-bold text-6xl">ummm...</div>
    <div class="font-bold text-2xl"> Estas en el lugar equivocado.</div>
    
    <NuxtLink to="/" class="font-bold my-5 text-white p-2" style="background:#040679;">Salir de aquí</NuxtLink>
  </div>
</template>
