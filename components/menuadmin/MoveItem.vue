<template>
    <div class="ml-auto flex items-center gap-1">
        <button v-if="!removeOk" @click="moveit('up')" class="hover:text-xyzaccent flex items-center">
            <Icon name="solar:square-double-alt-arrow-up-bold" />
        </button>
        <button v-if="!removeOk" @click="moveit('down')" class="hover:text-xyzaccent flex items-center">
            <Icon name="solar:square-double-alt-arrow-down-bold" />
        </button>

    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['move'])
const removeOk = ref(false)
const removeCheck = () => {
    removeOk.value = true
}
const moveit = (dir) => {
    emit('move', dir)
}
</script>