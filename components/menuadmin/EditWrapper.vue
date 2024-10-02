<template>

    <div class=" grid grid-cols-[1fr,2fr] gap-2 bg-white p-1 shadow-xl my-0.5 group "
        :class="istype == 'cat' ? 'cat' : 'plat'" v-auto-animate>
        <slot></slot>
    </div>

</template>



<script setup lang="ts">
const props = defineProps({
    istype: String
})
const ishidden = ref(false)

</script>
