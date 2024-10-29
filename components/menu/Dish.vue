<template>
    <article class="rs-articleWrapper shadow-md rounded-sm grid grid-cols-2 overflow-hidden mt-1">


        <div class="p-3 h-full flex flex-col justify-start items-start">
            <div class="text-menu_color1 text-xl font-bold" v-html="plat.name" />
            <div class="leading-4 text-sm" v-html="plat.description" />
        </div>

        <div class="flex flex-col gap-0.5 bg-slate-300 h-full">
            <template v-for="(variant, variant_index ) in plat.variants" v-if="plat?.variants && plat?.variants.length">
                <div class="p-3 shadow bg-menu_color1 text-white rounded-r-sm h-full flex flex-col">
                    <div v-html="variant.name" class="font-bold leading-4 opacity-90" />
                    <div v-html="variant.description" class="opacity-60 leading-3" />
                    <div class="text-right mt-auto text-xl ">
                        <MenuWhatsSelector v-if="menuStore.whatsOrderOn" :item="variant" :cat_index="cat_index"
                            :plat_index="index" :variant_index="variant_index">
                            <div v-html="formatCurrency(variant.price)" />
                        </MenuWhatsSelector>
                        <div v-else v-html="formatCurrency(variant.price)" />
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="p-3 shadow bg-menu_color1 text-white rounded-r-sm h-full">
                    <div class="text-right mt-auto text-xl ">
                        <MenuWhatsSelector v-if="menuStore.whatsOrderOn" :item="plat" :cat_index="cat_index"
                            :plat_index="index">
                            <div v-html="formatCurrency(plat.price)" />
                        </MenuWhatsSelector>
                        <div v-else v-html="formatCurrency(plat.price)" />
                    </div>
                </div>
            </template>
        </div>





    </article>
</template>
<script setup lang="ts">

const props = defineProps({
    plat: Object,
    index: Number,
    cat_index: Number
})

const menuStore = useMenu()

const formatCurrency = (value) => {
    const formatted = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(value);

    const [integerPart, decimalPart] = formatted.split('.');

    return decimalPart
        ? `${integerPart}<sup class="text-[8px] align-middle opacity-80  translate-x-0.5 -translate-y-0.5">${decimalPart}</sup>`
        : integerPart; // Handles cases where there is no decimal part
};

</script>