<template>
    <div class="categorysection p-1 mb-10" :id="`cat_${index}`">

        <div v-if="cat.photos" class="flex overflow-x-auto">
            <div v-for="(pho, pho_index) in cat.photos"
                :class="`aspect-[3/1] shadow-md rounded-t mx-auto bg-cover bg-center w-full bg-[url(${pho})]`"></div>
        </div>

        <div
            class="bg-slate-100 p-1 text-3xl font-bold text-menu_color2 shadow-md rounded-sm rs-catName sticky top-14 z-20">
            <h2 v-html="cat.name.toUpperCase()"></h2>
        </div>

        <div v-if="cat.description" class="rs-catDescription bg-slate-200 mb-1 px-1 py-5 leading-5 opacity-70"
            v-html="cat.description">
        </div>

        <div class="flex flex-col gap-2 mt-2">
            <template v-for="(plat, plat_index) in cat.list">
                <MenuDish :cat_index="cat.realIndex" :index="plat_index" :plat="plat" />
            </template>
        </div>




    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    index: Number,
    cat: Object
})
const menuStore = useMenu()
</script>