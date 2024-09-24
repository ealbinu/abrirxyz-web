<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="flex justify-center items-center flex-col gap-4 w-screen h-screen overflow-y-auto text-center"
    style="color:#040679; background:#ffdd04;">
    <img src="/img/abrirxyz.svg" alt="Abrir.xyz" class="w-2/3 max-w-96">
    <div class="font-bold text-xl">
      Aquí hay utilidades web...
    </div>
    <div class="font-bold">
      Podrás encontrar más información en:
    </div>
    <div class="flex flex-col w-full max-w-xl p-5 gap-10 justify-center items-center ">
      <div>
        <a href="https://talachadigital.com" alt="Talacha Digital">
          <img src="/img/talachadigital.svg" alt="Talacha Digital" class="w-full max-w-40 mix-blend-plus-darker">
        </a>
      </div>
      <div>
        <a href="https://dragonbarbudo.com" alt="Dragón Barbudo">
          <img src="/img/dragonbarbudo.svg" alt="Dragón Barbudo" class="w-full  mix-blend-plus-darker">
        </a>
      </div>
    </div>
  </div>

</template>
