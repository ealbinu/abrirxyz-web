<template>
    <div class="text-center px-5 py-2">
        <img :src="menuStore.thelogo" :alt="menuStore.thename" class="mx-auto w-full max-w-44"
            :class="menuStore.thestyles.logos">
        <!--
            <h1 :class="menuStore.thestyles.restname" class="rs-restname">{{ menuStore.thename }}</h1>
        -->
    </div>
</template>

<script setup lang="ts">
const props = defineProps({



})

const menuStore = useMenu()
</script>