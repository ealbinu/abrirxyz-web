<template>
    <div class="">
        <button v-if="!removeOk" @click="removeCheck" class="hover:text-xyzaccent flex items-center">
            <Icon name="solar:trash-bin-trash-bold" />
        </button>
        <button v-else @click="removeFile"
            class="bg-zinc-100 hover:bg-xyzaccent rounded-xl font-bold text-xs px-2 flex justify-center items-center">
            Eliminar
        </button>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['removeit'])
const removeOk = ref(false)
const removeCheck = () => {
    removeOk.value = true
    setTimeout(() => {
        removeOk.value = false
    }, 2000)
}
const removeFile = () => {
    emit('removeit')
}
</script>