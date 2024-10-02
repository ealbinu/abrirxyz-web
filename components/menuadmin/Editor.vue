<template>
    <div class="font-menu_font0 flex flex-col gap-2 text-xyzsec text-center text-xl my-5 p-2">
        <div class="text-2xl sm:text-3xl">Estas son las categorías de tu menú.</div>
        <div class="flex gap-1 flex-wrap justify-center items-center">
            <div>Edítalas dando click sobre ellas</div>
            <div class="flex items-center">
                <Icon name="solar:mouse-minimalistic-line-duotone" class="text-xyzmain" />
            </div>
            <div>,</div>
            <div>también puedes ordenarlas</div>
            <div class="flex items-center">
                <Icon name="solar:square-alt-arrow-left-linear" class="text-xyzmain" />
                <Icon name="solar:square-alt-arrow-right-linear" class="text-xyzmain" />
            </div>
            <div>,</div>
            <div>eliminarlas</div>
            <div class="flex items-center">
                <Icon name="solar:trash-bin-trash-bold" class="text-xyzmain" />
            </div>
            <div>,</div>
            <div>o crear nuevas</div>
            <div class="flex items-center">
                <Icon name="solar:add-square-bold" class="text-xyzmain" />
            </div>
            <div>.</div>
        </div>
    </div>
    <div class="font-menu_font0 grid grid-cols-2 md:grid-cols-3 gap-2 text-center" v-auto-animate>
        <div v-for="(cat, cat_index) in menuIn" :key="cat" :data-index="cat_index"
            class="aspect-square flex justify-center items-center bg-xyzsec text-white rounded-lg relative flex-col cursor-pointer hover:bg-xyzsec2">
            <div class="absolute top-2 left-2 text-xyzmain text-xl flex gap-2">
                <Icon name="solar:square-alt-arrow-left-linear" class="text-xyzmain hover:text-xyzaccent cursor-pointer"
                    @click="moveCat('up', cat_index)" />
                <Icon name="solar:square-alt-arrow-right-linear"
                    class="text-xyzmain hover:text-xyzaccent cursor-pointer" @click="moveCat('down', cat_index)" />
            </div>
            <div class="absolute top-2 right-2 text-xyzmain">
                <MenuadminRemoveItem @removeit="removeCat(cat_index)" />
            </div>
            <div @click="currentCat = cat" class="h-full w-full flex justify-center items-center flex-col">
                <div class="p-2 bg-zinc-100 text-xyzmain rounded ">{{ cat.name }}</div>
                <div class="text-zinc-100 mt-2"> {{ cat.list?.length }} platillos </div>
            </div>

        </div>
        <div @click="addCat()"
            class="aspect-square flex justify-center items-center border-xyzsec border-dashed border-4 text-xyzsec rounded-lg relative flex-col cursor-pointer hover:bg-xyzaccent">
            <Icon name="solar:add-square-line-duotone" class="text-4xl" />
            Añadir categoría
        </div>
        <!--
            //TODO: Añadir categoria
        -->
    </div>

    <MenuadminEditorModal @closeme="currentCat = null" :cat="currentCat" :photos="photos" :serverurl="serverurl"
        @open-photos="openPhotos" />
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'openPhotos'])
const props = defineProps({
    modelValue: Object,
    photos: Array,
    serverurl: String
})

const menuIn = ref(props.modelValue)

watch(() => menuIn, (newv) => {
    emit('update:modelValue', menuIn.value)
})

const currentCat = ref(null)

const removeCat = (cat_index) => {
    menuIn.value.splice(cat_index, 1)
}
const moveCat = ($event, cat_index) => {
    if ($event == 'up') {
        if (cat_index > 0) {
            [menuIn.value[cat_index], menuIn.value[cat_index - 1]] = [menuIn.value[cat_index - 1], menuIn.value[cat_index]]
        }
    }
    if ($event == 'down') {
        if (cat_index < menuIn.value.length - 1) {
            [menuIn.value[cat_index], menuIn.value[cat_index + 1]] = [menuIn.value[cat_index + 1], menuIn.value[cat_index]]
        }
    }
}

const addCat = () => {
    menuIn.value.push(
        {
            name: 'CATEGORÍA ' + Math.round(Math.random() * 100),
            description: '',
            photos: [],
            list: [],
        }
    )
}

const openPhotos = () => {
    emit('openPhotos')
}


</script>