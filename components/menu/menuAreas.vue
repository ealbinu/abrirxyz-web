<template>
    <div class="flex flex-wrap justify-center gap-1 w-full mt-5 px-1" v-auto-animate
        v-if="menuStore.areas && menuStore.areas.length">
        <template v-for="(item, index) in menuStore.areas">
            <div class="grow text-center p-1 cursor-pointer text-xl rounded-sm " v-auto-animate
                :class="item === menuStore.activeArea ? 'bg-menu_color1 text-white shadow-md transition-all duration-700' : 'bg-menu_color3'"
                v-html="item" @click="menuStore.setActiveArea(item)"></div>
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    areas: Array,
    modelValue: String
})

const menuStore = useMenu()




</script>
