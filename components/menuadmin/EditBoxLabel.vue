<template>
    <div
        class="w-full font-menu_font0 flex justify-between items-center gap-1 cursor-pointer bg-white/10  hover:bg-xyzsec py-2 px-2 rounded">
        <div class="font-bold text-xs" v-html="label" />
        <Icon :name="iconname" class="text-xl" />
    </div>
</template>


<script setup lang="ts">
const props = defineProps({
    label: String,
    iconname: String
})
</script>
