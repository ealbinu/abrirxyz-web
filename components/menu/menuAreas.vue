<template>
    <div class="flex gap-2 flex-wrap w-full mt-10" v-auto-animate v-if="areas && areas.length">
        <template v-for="(item, index) in areas">
            <div class="grow text-center p-2 cursor-pointer text-xl" v-auto-animate
                :class="item === modelValue ? 'bg-menu_color1 text-white' : 'bg-menu_color2'" v-html="item"
                @click="selectArea(item, index)"></div>
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    areas: Array,
    styles: Object,
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const selectArea = (area, index) => {
    emit('update:modelValue', area)
}
</script>

<style scoped></style>