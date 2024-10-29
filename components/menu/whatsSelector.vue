<template>

    <div class="btn">
        <div class="text-sm flex justify-center items-center gap-0.5">

            <div @click="removeit" class="menu-btn group text-green-600 !p-1" :class="!item?.qty ? 'opacity-10' : ''">
                <Icon name="mingcute:minus-circle-line" class="menu-btn-icon" />
            </div>
            <div v-html="item?.qty ? item?.qty : 0"
                class="flex text-xl items-center justify-center    bg-black/20 rounded-sm aspect-square w-8">

            </div>
            <div @click="addit" class="menu-btn group text-green-600 !p-1">
                <Icon name="mingcute:add-circle-line" class="menu-btn-icon" />
            </div>
        </div>

        <slot></slot>
    </div>

</template>

<script setup lang="ts">
const props = defineProps({
    item: Object,
    cat_index: Number,
    plat_index: Number,
    variant_index: {
        type: [Number, null],
        required: false
    }
})

const menuStore = useMenu()
const addit = () => {
    if (!props.item?.qty) {
        menuStore.setQty(props.cat_index, props.plat_index, props.variant_index, 1)
    } else {
        menuStore.setQty(props.cat_index, props.plat_index, props.variant_index, props.item.qty + 1)
    }
}
const removeit = () => {
    if (props.item?.qty > 1) {
        menuStore.setQty(props.cat_index, props.plat_index, props.variant_index, props.item.qty - 1)
    } else {
        menuStore.setQty(props.cat_index, props.plat_index, props.variant_index, 0)
    }
}


</script>


<style lang="postcss" scoped>
.btn {
    @apply flex justify-between items-center mt-1 text-center w-full gap-1 py-1 px-2 shadow-md bg-green-600 rounded-sm
}
</style>