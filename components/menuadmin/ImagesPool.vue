<template>
    <client-only>
        <div class="fixed right-0 top-0 bottom-0 w-5/6 md:w-1/3 z-50 transition-all font-menu_font0"
            :class="!deployed ? 'translate-x-full' : ''">
            <div @click="deployed = !deployed"
                class="absolute right-full py-2 mt-4 h-36  text-white rounded-l flex flex-col justify-center items-center cursor-pointer hover:bg-xyzmain"
                :class="deployed ? 'bg-xyzmain' : 'bg-xyzsec'">
                <Icon name="solar:gallery-bold-duotone" class="text-lg" />
                <div class=" font-bold h-16 flex justify-center items-center">
                    <span class="block -rotate-90">
                        {{ deployed ? 'Cerrar' : 'Fotos' }}
                    </span>
                </div>
                <Icon name="solar:double-alt-arrow-right-bold-duotone" class="text-4xl mt-auto " v-if="deployed" />
                <Icon name="solar:double-alt-arrow-left-bold-duotone" class="text-4xl mt-auto " v-else />
            </div>
            <div class=" bg-xyzsec p-1 flex h-full flex-col grow gap-1">
                <div class="w-full grow flex flex-col relative">

                    <div
                        class="absolute opacity-30 z-10 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center pointer-events-none">
                        <Icon name="solar:inbox-in-line-duotone" class="text-8xl text-xyzsec animate-ping" />
                    </div>

                    <div class="absolute z-10 left-0 top-0 right-0">
                        <div
                            class=" w-fit px-3 py-1 font-bold bg-xyzsec mx-auto text-zinc-100 rounded-b-lg flex gap-2 items-center">
                            Agrega aquí tus fotos
                            <Icon name="solar:gallery-add-bold-duotone" class="text-2xl" />
                        </div>
                    </div>
                    <file-pond :labelFileTypeNotAllowed="'Sólo imagenes'"
                        fileValidateTypeLabelExpectedTypes="JPG, PNG, GIF; HEIF" ref="pond"
                        @processfile="removeFileAfterUpload" allow-revert="false" accepted-file-types="image/*"
                        name="photos" :server="serverOptions" allow-multiple="true" :files="myFiles"
                        class-name="cursor-pointer hover:font-bold h-full" credits="false" label-idle=""
                        class="grow h-full"></file-pond>
                </div>
                <div class="overflow-y-auto bg-zinc-100 rounded-xl max-h-[50%]">
                    <div class="sticky top-0 z-20">
                        <div
                            class=" border-2 border-t-0 border-zinc-100 mx-auto w-fit px-3 py-1 font-bold bg-xyzsec text-zinc-100 rounded-b-lg flex gap-2 items-center">
                            Fotos guardadas
                            <Icon name="solar:gallery-wide-line-duotone" class="text-2xl" />
                        </div>
                    </div>
                    <div class="grow grid grid-cols-3 justify-start items-start gap-1 px-1 pb-1 pt-3 bg-zinc-100"
                        v-auto-animate>
                        <div v-for="(item, index) in serverFiles" :key="index"
                            class="border-4 border-xyzsec aspect-square text-center rounded-xl mx-auto flex relative items-end p-1 w-24 h-24 max-w-full"
                            :class="`bg-[url(${serverurl}${item})] bg-cover bg-center`" v-if="serverurl">

                            <div class="absolute -top-1 -right-1 z-10">
                                <button v-if="!removeOk[item]" @click="removeCheck(item)"
                                    class="bg-zinc-100 hover:bg-xyzaccent rounded-full aspect-square w-6 flex justify-center items-center">
                                    <Icon name="solar:trash-bin-trash-bold" />
                                </button>
                                <button v-else @click="removeFile(item, index)"
                                    class="bg-zinc-100 hover:bg-xyzaccent rounded-xl font-bold text-xs px-2 h-6 flex justify-center items-center">
                                    Eliminar
                                </button>
                            </div>
                            <NuxtLink :to="serverurl + item" target="_blank" class="w-full">
                                <div
                                    class="text-[8px] bg-zinc-100 hover:bg-xyzaccent group font-bold rounded px-1 py-0.5 text-zinc-800 !w-full leading-[10px] flex justify-center items-center">
                                    <div class="group-hover:opacity-20 break-all">{{ item.slice(0, -10) }}</div>
                                    <div class="group-hover:block hidden absolute">Ver imagen</div>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import PocketBase from 'pocketbase';



const config = useRuntimeConfig()
const pb = new PocketBase(config.public.server_base);

import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import Compressor from 'compressorjs';


const deployed = ref(true)

const emit = defineEmits(['update:modelValue', 'server'])
const props = defineProps({
    recordId: String,
    modelValue: Array
})



const pond = ref(null)
const serverFiles = ref(props.modelValue)

const serverurl = ref('')
const myFiles = ref([])

const getServerUrl = async (firstphoto) => {
    const record = await pb.collection('menu').getOne(props.recordId);
    const photosurl = pb.files.getUrl(record, serverFiles.value[0], { 'thumb': '100x250' })
    serverurl.value = photosurl.replace(serverFiles.value[0] + '?thumb=100x250', '')

    emit('server', serverurl.value)
}

if (props.modelValue) {
    getServerUrl()
}



const removeOk = ref({})



const removeCheck = (name) => {
    removeOk.value[name] = true
    setTimeout(() => {
        removeOk.value[name] = false
    }, 2000)
}

const removeFile = async (fileName, fileIndex) => {
    await pb.collection('menu').update(props.recordId, {
        'photos-': [fileName],
    });
    serverFiles.value?.splice(fileIndex, 1)
    emit('update:modelValue', serverFiles.value)
    removeOk.value[fileIndex] = false
}



const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);

const removeFileAfterUpload = (error, file) => {
    if (!error) {
        setTimeout(() => {
            pond.value.removeFile(file);
        }, 800)
    }
};



function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

async function compressImage(file) {
    let compressedFile = file;
    let fileSizeInKB = file.size / 1024;
    let attempts = 0;

    const mimeType = isSafari() ? 'image/jpeg' : 'image/webp';

    while (fileSizeInKB > 200 && attempts < 3) {
        compressedFile = await new Promise((resolve, reject) => {
            new Compressor(compressedFile, {
                width: 480,
                minWidth: 480,
                maxWidth: 480,
                resize: 'contain',
                mimeType: mimeType, // Use JPEG for Safari, WebP otherwise
                quality: 0.8, // Adjust quality if needed
                success(result) {
                    resolve(result);
                },
                error(err) {
                    console.error(err.message);
                    reject(err);
                }
            });
        });

        fileSizeInKB = compressedFile.size / 1024;
        attempts++;
    }

    return compressedFile;
}



const serverOptions = {
    load: serverurl.value,
    process: async (fieldName, file, metadata, load, error, progress, abort) => {
        let fileProcess = file

        fileProcess = await compressImage(fileProcess);

        const formData = new FormData();

        formData.append('photos', fileProcess, file.name.split('.').slice(0, -1).join('.') + '.webp');


        (async () => {
            try {
                const updateFile = await pb.collection('menu').update(props.recordId, formData);
                if (updateFile) {
                    serverFiles.value = updateFile.photos
                    emit('update:modelValue', serverFiles.value)
                    load(updateFile.photos[updateFile.photos.length - 1]);


                    getServerUrl(updateFile.photos[0])

                }
            } catch (err) {
                console.error('Upload failed:', err);
                error('Ocurrió un error al cargar la imagen');
            }
        })();


        return {
            // Support aborting the upload
            abort: () => {
                abort();
            }
        };
    }
};

onMounted(() => {
    setTimeout(() => {
        deployed.value = false
    }, 1000)
})



const open = () => {
    deployed.value = true
}
defineExpose({
    open
})

useNuxtApp().$bus.$on('imgPool', () => {
    open()
})

</script>


<style>
.filepond--browser.filepond--browser {
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
}
</style>