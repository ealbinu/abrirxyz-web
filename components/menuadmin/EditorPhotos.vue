<template>


    <div class="bg-zinc-100 rounded text-black text-center">
        <button class="w-full hover:bg-xyzaccent rounded" @click="photosModal = true">Seleccionar foto</button>
    </div>

    <div class="fixed flex justify-center items-center z-20 inset-0 bg-zinc-100/60" v-if="photosModal">
        <div class="bg-xyzsec text-white p-2 rounded-lg  border-8 border-zinc-100  relative">
            <button @click="photosModal = false"
                class="bg-xyzsec text-white absolute bottom-full right-0 rounded-t py-1 px-4 flex justify-center items-center gap-2 hover:bg-xyzmain">
                <Icon name="solar:close-circle-broken" /> Cerrar
            </button>
            <div>Elije una foto</div>
            <div class="w-full h-96 max-w-2xl overflow-y-auto grid grid-cols-3 justify-start items-start gap-1 p-5">

                <div @click="selectPhoto(null)"
                    class="cursor-pointer hover:border-xyzaccent border-2 border-zinc-100 aspect-square text-center rounded-xl  flex relative items-center justify-center p-1 w-24 h-24 max-w-full">
                    Sin foto
                </div>

                <div v-for="(item, index) in photos" :key="index" @click="selectPhoto(serverurl + item)"
                    class="cursor-pointer hover:border-xyzaccent border-2 border-zinc-100 aspect-square text-center rounded-xl  flex relative items-end p-1 w-24 h-24 max-w-full"
                    :class="`bg-[url(${serverurl}${item})] bg-cover bg-center`">
                </div>

                <div @click="addPhoto()"
                    class="cursor-pointer col-span-3 hover:border-xyzaccent border-2 border-dashed border-zinc-100 w-full text-center rounded-xl  flex relative items-center justify-center flex-col p-1  h-24 max-w-full ">
                    <Icon name="solar:gallery-bold-duotone" class="text-4xl" />
                    Añadir nueva foto
                </div>
            </div>

        </div>

    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['openPhotos'])

const props = defineProps({
    modelValue: [String, Array],
    istype: String,
    photos: Array,
    serverurl: String,
})
//const { $bus } = useNuxtApp();


const internalValue = ref(props.modelValue || undefined)

watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue)
})

const photosModal = ref(false)
const selectPhoto = (url) => {

    if (url) {
        internalValue.value = props.istype == 'photos' ? [url] : ["", url]
    } else {
        internalValue.value = []
    }

    photosModal.value = false
}
const addPhoto = () => {
    photosModal.value = false
    //emit('openPhotos', true)
    useNuxtApp().$bus.$emit('imgPool')
};

</script>