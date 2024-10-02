<template>
    <div v-if="cat" class="fixed inset-0 bg-white/80 flex justify-center items-start md:items-center z-20">
        <div
            class="bg-xyzsec w-full max-w-3xl h-5/6 md:max-h-full md:aspect-square mt-2 ml-2 mr-10 md:m-0 p-1 rounded-xl border-8 border-zinc-100 relative">

            <div class="absolute top-0 right-4 border-4 border-zinc-100 border-t-0 rounded-b-lg bg-xyzmain hover:bg-xyzsec2 text-white px-3 py-1 cursor-pointer flex justify-center items-center z-20 gap-2"
                @click="closeMe">
                <Icon name="solar:close-circle-broken" /> Cerrar
            </div>

            <div class=" font-menu_font0 overflow-y-auto w-full max-h-full p-5">
                <div class="flex flex-col gap-5">
                    <div class="px-1 pt-5 text-xyzmain text-lg"><span class="font-bold text-white text-xl">{{
                        cat.name }}</span></div>
                    <FormKit v-model="cat.name" label="Nombre" />
                    <FormKit v-model="cat.description" label="Descripción" type="textarea" />
                    <div>
                        <div
                            class="w-full min-h-32 p-2 flex flex-col justify-end border-white border-dashed rounded-lg border-4">
                            <div v-if="cat.photos?.length"
                                :class="`bg-[url(${cat.photos[0]})] bg-cover bg-center w-full h-40 mb-2`" />
                            <MenuadminEditorPhotos @open-photos="openPhotos" v-model="cat.photos" istype="photos"
                                :photos="photos" :serverurl="serverurl" />
                        </div>
                    </div>
                    <div class="p-1 text-xyzmain text-lg">Platillos</div>
                    <div class="flex flex-col gap-5" v-auto-animate>
                        <article v-for="(plat, plat_index) in cat.list" :key="plat" :data-key="plat_index"
                            class="flex flex-col gap-5 px-2 py-4 justify-start h-fit rounded bg-xyzsec2 relative"
                            v-auto-animate>
                            <div class=" p-2 bg-white/10 text-white text-lg font-bold hover:bg-xyzmain cursor-pointer rounded flex justify-between items-center"
                                @click="plats[plat_index] = !plats[plat_index]">
                                <div>{{ plat.name }}</div>
                                <Icon v-if="plats[plat_index]" name="solar:double-alt-arrow-up-bold-duotone"
                                    class="text-2xl" />
                                <Icon v-else name="solar:double-alt-arrow-down-bold-duotone" class="text-2xl" />
                            </div>

                            <div class=" text-xyzmain text-xl flex gap-2 justify-end items-center">
                                <Icon name="solar:square-alt-arrow-up-linear"
                                    class="text-xyzmain hover:text-xyzaccent cursor-pointer"
                                    @click="movePlat('up', plat_index)" />
                                <Icon name="solar:square-alt-arrow-down-linear"
                                    class="text-xyzmain hover:text-xyzaccent cursor-pointer"
                                    @click="movePlat('down', plat_index)" />
                                <MenuadminRemoveItem @removit="removePlat(plat_index)" />
                            </div>
                            <div v-if="plats[plat_index]" class="flex flex-col gap-5" :data-key="plat_index"
                                :key="plat_index">
                                <FormKit v-model="plat.name" label="Nombre" />
                                <FormKit v-model="plat.description" label="Descripción" type="textarea" />
                                <div>
                                    <div
                                        class="w-full min-h-32 p-2 flex flex-col justify-end border-xyzmain border-dashed rounded-lg border-4">
                                        <div v-if="plat.photo?.length"
                                            :class="`bg-[url(${plat.photo[1]})] bg-cover bg-center w-full h-20 mb-2`" />
                                        <MenuadminEditorPhotos @open-photos="openPhotos" v-model="plat.photo"
                                            istype="photo" :photos="photos" :serverurl="serverurl" />
                                    </div>
                                </div>

                                <FormKit v-model="plat.information" label="Información" />
                                <div class="p-1 text-xyzmain text-lg">Variantes</div>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-5" v-auto-animate>
                                    <template v-for="(variant, variant_index) in plat.variants"
                                        :key="plat_index+'_'+variant_index">
                                        <article :data-key="plat_index + '_' + variant_index"
                                            class="flex flex-col gap-5 px-2 py-4  rounded bg-xyzsec relative">
                                            <div class="flex justify-between items-center p-1">
                                                <div class=" text-xyzmain text-xl flex gap-2">
                                                    <Icon name="solar:square-alt-arrow-left-linear"
                                                        class="text-xyzmain hover:text-xyzaccent cursor-pointer"
                                                        @click="moveVariant('up', plat_index, variant_index)" />
                                                    <Icon name="solar:square-alt-arrow-right-linear"
                                                        class="text-xyzmain hover:text-xyzaccent cursor-pointer"
                                                        @click="moveVariant('down', plat_index, variant_index)" />
                                                </div>
                                                <div class=" text-xyzmain">
                                                    <MenuadminRemoveItem
                                                        @removit="removeVariant(plat_index, variant_index)" />
                                                </div>
                                            </div>

                                            <FormKit v-model="variant.name" label="Nombre" />
                                            <FormKit v-model="variant.description" label="Descripción"
                                                type="textarea" />
                                            <FormKit v-model="variant.price" label="Precio" type="number" />
                                        </article>
                                    </template>
                                    <article @click="addVariant(plat_index)"
                                        class="flex flex-col  gap-2 justify-center border-2 text-center border-dashed border-zinc-100 hover:text-black items-center text-white text-xl px-2 py-4  rounded bg-xyzsec cursor-pointer hover:bg-xyzaccent">
                                        <Icon name="solar:add-square-line-duotone" class="text-4xl" />
                                        Añadir variante
                                    </article>
                                </div>
                            </div>
                        </article>


                    </div>
                    <!-- //TODO: Añadir platillo -->
                    <article @click="addPlat()"
                        class="flex flex-col  gap-2 justify-center border-2 border-dashed text-center border-zinc-100 hover:text-black items-center text-white text-xl px-2 py-4  rounded bg-xyzsec cursor-pointer hover:bg-xyzaccent">
                        <Icon name="solar:add-square-line-duotone" class="text-4xl " />
                        Añadir platillo
                    </article>
                </div>
                <div class="border-4 border-zinc-100  text-xl  w-fit mx-auto rounded-lg px-5 py-5 my-5 bg-xyzmain hover:bg-xyzsec2 text-white cursor-pointer flex justify-center items-center z-20 gap-2"
                    @click="closeMe">
                    Cerrar y continuar editando
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    cat: Object,
    photos: Array,
    serverurl: String
})

const plats = ref({})

const dataVariant = {
    name: 'Variante  ',
    description: '',
    price: 100,
}
const dataPlat = {
    name: 'Platillo ',
    description: 'mmm!',
    variants: [dataVariant],
    information: ''
}

const getDataVariant = () => {
    let d = { ...dataVariant }
    d.name += ' ' + Math.round(Math.random() * 100)
    return d
}
const getdDataPlat = () => {
    let d = { ...dataPlat }
    d.name += ' ' + Math.round(Math.random() * 100)
    d.variants = [getDataVariant()]
    return d

}

const addVariant = (plat_index) => {
    props.cat.list[plat_index].variants.push(getDataVariant())
}

const removeVariant = (plat_index, variant_index) => {
    props.cat.list[plat_index].variants.splice(variant_index, 1)
}
const moveVariant = ($event, plat_index, variant_index) => {
    let variants = props.cat.list[plat_index].variants;
    if ($event === 'up') {
        if (variant_index > 0) {
            [variants[variant_index], variants[variant_index - 1]] = [variants[variant_index - 1], variants[variant_index]];
        }
    }
    else if ($event === 'down') {
        if (variant_index < variants.length - 1) {
            [variants[variant_index], variants[variant_index + 1]] = [variants[variant_index + 1], variants[variant_index]];
        }
    }
};


const emit = defineEmits(['openPhotos', 'closeme'])

const openPhotos = () => {
    emit('openPhotos')
}
const closeMe = () => {
    emit('closeme')
    plats.value = {}
}





const addPlat = () => {
    props.cat.list.push(getdDataPlat())
    plats.value[Object.keys(props.cat.list).length - 1] = true
}

const removePlat = (plat_index) => {
    props.cat.list.splice(plat_index, 1)
}
const movePlat = ($event, plat_index) => {
    let plat = props.cat.list;
    if ($event === 'up') {
        if (plat_index > 0) {
            [plat[plat_index], plat[plat_index - 1]] = [plat[plat_index - 1], plat[plat_index]];
        }
    }
    else if ($event === 'down') {
        if (plat_index < plat.length - 1) {
            [plat[plat_index], plat[plat_index + 1]] = [plat[plat_index + 1], plat[plat_index]];
        }
    }
};

</script>