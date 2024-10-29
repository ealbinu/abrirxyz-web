<template>
    <div :class="menuStore.thestyles?.preloading || 'bg-white'"
        class="fixed  inset-0 flex justify-center items-center z-50 flex-col gap-5 rs-preloading" ref="preloader"
        v-if="preloading">

        <MenuLogo :thelogo="menuStore.thelogo" :thename="menuStore.thename" :thestyles="menuStore.thestyles" />

        <Icon name="solar:refresh-circle-line-duotone" class="text-4xl animate-spin rs-preloadingIcon"
            :class="menuStore.thestyles?.preloadingIcon"></Icon>
    </div>
</template>

<script setup lang="ts">
import { animate } from "motion"
const props = defineProps({

})


const menuStore = useMenu()

const preloader = ref<HTMLElement | null>(null)
const preloading = ref(true)

var lastLoadTime = 0;
const checkloader = () => {
    lastLoadTime = performance.now();
    // Start a timer to check after 500ms
    setTimeout(() => {
        let currentTime = performance.now();
        let timeDiff = currentTime - lastLoadTime;
        if (timeDiff >= 300) {
            animate(preloader.value, { y: [-window.innerHeight], opacity: 0 }, { duration: .8 }).finished.then(() => {
                preloading.value = false
            })
        }
    }, 500);

}


onMounted(() => {
    checkloader();
})

</script>