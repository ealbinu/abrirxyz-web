<template>
    <div class="fixed z-20 bottom-2 right-0" v-if="!previewWindow">
        <div @click="setPreview()"
            class="rounded-l-full pl-6 pr-4 py-1 font-bold bg-xyzsec text-center text-white cursor-pointer hover:bg-xyzmain border-4 border-r-0 border-zinc-100">
            <div class="text-lg leading-5">Guardar cambios</div>
            <div class="text-sm ">y publicar menú</div>
        </div>
    </div>
    <template v-if="previewWindow">
        <div class="fixed inset-0 z-50 bg-white/80 p-1">
            <div class="max-w-xl mx-auto bg-white p-5 gap-2 h-full bg-xyzsec flex flex-col rounded">
                <div class="font-menu_font0 text-white text-lg text-center ">Explora tu menú y si estas listo da click
                    en "publicar".</div>
                <div class="bg-white overflow-y-auto relative py-1 px-4 text-center grow">
                    <MenuBaseMenu :thedata="menuData" :hidemenu="true" v-if="!loading" />
                    <div class="w-full h-full flex justify-center items-center text-xyzsec" v-else>
                        <Icon name="hugeicons:first-bracket-circle" class="animate-spin text-8xl" />
                    </div>
                </div>



                <div class="grid grid-cols-3 gap-2">
                    <div @click="previewWindow = false"
                        class="bg-xyzmain hover:bg-white text-white hover:text-xyzsec cursor-pointer rounded rounded-b-lg  p-4 text-center font-bold ">
                        Seguir editando
                    </div>
                    <div @click="publish"
                        class="bg-xyzaccent col-span-2 text-xyzmain hover:bg-xyzmain hover:text-xyzsec cursor-pointer rounded rounded-b-lg p-4 text-center  font-bold text-lg">
                        Publicar
                    </div>
                </div>
            </div>
        </div>



    </template>

    <div v-if="success"
        class="fixed inset-10 animate-pulse z-50 bg-xyzaccent text-xyzmain font-bold flex justify-center items-center text-3xl p-5 text-center font-menu_font0 rounded-xl">
        MENÚ ACTUALIZADO
    </div>
</template>
<script setup lang="ts">
import PocketBase from 'pocketbase';
const config = useRuntimeConfig()
const pb = new PocketBase(config.public.server_base);

const props = defineProps({
    menu: Object,
    photos: Array,
    recordid: String,
    token: String
})
const iframe = ref<HTMLIFrameElement | null>(null)
const menuData = ref(null)
const previewWindow = ref(false)
const success = ref(false)
const loading = ref(true)

const setPreview = () => {
    menuData.value = props.menu
    previewWindow.value = true
    setTimeout(() => {
        loading.value = false
    }, 1000)
}



const publish = async () => {

    const data = {
        "menu": menuData.value
    };
    const record = await pb.collection('menu').update(props.recordid, data);

    if (record.updated) {
        //Success
        loading.value = true
        setTimeout(() => {
            success.value = true
            previewWindow.value = false
            loading.value = false
            setTimeout(() => {
                success.value = false
            }, 2000)
        }, 1500)
    }
}





</script>