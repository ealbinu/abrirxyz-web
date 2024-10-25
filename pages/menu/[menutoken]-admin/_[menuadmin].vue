<script setup lang="ts">
import PocketBase from 'pocketbase'


import { isClient } from '@vueuse/shared'

const route = useRoute()

const config = useRuntimeConfig()
const pb = new PocketBase(config.public.server_base);


const { data: record, error } = await useAsyncData('menuRecord', async () => {
    try {
        return await pb.collection('menu').getFirstListItem(
            `token="${route.params.menutoken.toUpperCase()}" && id="${route.params.menuadmin}"`,
            { expand: "owner" }
        );
    } catch (err) {
        console.error('Error fetching record:', err);
        throw err;
    }
});


const recordid = record.value.id
const photos = ref(record.value.photos)

const rest = ref({ ...record.value.menu })

// missing keys
if (rest.value) {
    for (var i in rest.value.menu) {
        let cat = rest.value.menu[i]
        if (!cat?.photos) { rest.value.menu[i].photos = [] }
    }
}


useHead({
    title: rest.value.name,
    htmlAttrs: { lang: 'es' },
    meta: [
        { name: 'description', content: 'Menú digital' }
    ],
    script: [
        {
            src: 'https://cdn.tailwindcss.com',
            tagPosition: 'head'
        }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: rest.value.favicon }]
})



const navView = ref(false)


const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(value);
};



const loadFonts = async () => {
    const WebFont = await import('webfontloader');
    if (rest.value.style.fonts.length) {
        WebFont.load({
            google: { families: rest.value.style.fonts }
        });
        document.documentElement.style.setProperty('--menu-font1', rest.value.style.fonts[0]);
        document.documentElement.style.setProperty('--menu-font2', rest.value.style.fonts[1]);
    }
}

const loadColors = () => {
    document.documentElement.style.setProperty('--menu-color1', rest.value.style.colors[0]);
    document.documentElement.style.setProperty('--menu-color2', rest.value.style.colors[1]);
    document.documentElement.style.setProperty('--menu-color3', rest.value.style.colors[2]);
}

const isFontSize = ref(false)



const tailwindconf = () => {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    menu_color1: "var(--menu-color1)",
                    menu_color2: "var(--menu-color2)",
                    menu_color3: "var(--menu-color3)",
                },
                fontFamily: {
                    menu_font1: "var(--menu-font1)",
                    menu_font2: "var(--menu-font2)",
                },
            },
        }
    }
}


const startMounting = async () => {

    loadFonts();
    loadColors();

};






onMounted(() => {
    tailwindconf()
    startMounting();
});


const img = useImage()

const bgPhoto = (imgurl) => {
    const theimg = img(imgurl, { width: 580, height: 200 })
    return theimg
}



const imagesPool = ref(null)

const serverurl = ref(null)
const setServerUrl = (e) => { serverurl.value = e }
const openPhotos = () => {
    imagesPool.value.open()
}


const dataVariant = {
    name: 'Nuevo!',
    description: '',
    price: 100,
}
const dataPlat = {
    name: 'Platillo!',
    description: 'mmm!',
    variants: [dataVariant],
    information: ''
}


const addPlat = (cat_index) => {
    rest.value.menu[cat_index].list.push(dataPlat)
}

const addVariant = (cat_index, plat_index) => {
    rest.value.menu[cat_index].list[plat_index].variants.push(dataVariant)
}

const removeVariant = (cat_index, plat_index, variant_index) => {
    rest.value.menu[cat_index].list[plat_index].variants.splice(variant_index, 1)
}
const moveVariant = ($event, cat_index, plat_index, variant_index) => {
    let variants = rest.value.menu[cat_index].list[plat_index].variants;
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

const [variantsParentEl] = useAutoAnimate({ duration: 500 })




const removePlat = (cat_index, plat_index) => {
    rest.value.menu[cat_index].list.splice(plat_index, 1)
}
const movePlat = ($event, cat_index, plat_index) => {
    let plat = rest.value.menu[cat_index].list;
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


const filterCat = ref(0)


</script>

<template>
    <MenuadminImagesPool ref="imagesPool" v-model="photos" :record-id="recordid" @server="setServerUrl" />

    <div class="font-menu_font1 max-w-2xl mx-auto p-2"
        :class="rest.bgpattern ? `bg-[url(${rest.bgpattern})] bg-repeat-x bg-[length:128px]` : ''">
        <!-- LOGO -->
        <div class="text-center p-5">
            <img :src="rest.logo" :alt="rest.name" class="mx-auto w-full" :class="rest.style.logos">
            <h1 :class="rest.style.restname">{{ rest.name }}</h1>
        </div>



        <MenuadminEditor v-model="rest.menu" :photos="photos" :serverurl="serverurl" @open-photos="openPhotos" />

    </div>

    <div class="my-20">
        <img src="/img/wiggle.svg" alt="Abrir.xyz" class="w-full ">
    </div>



    <div class="font-menu_font1 max-w-2xl mx-auto hidden md:block">



        <div class="font-menu_font0 flex flex-col gap-2 text-xyzsec text-center text-xl my-5">
            <div class="text-3xl">EDITOR VISUAL</div>
            <div class="text-base">Mira el menú actualizarse mientras lo editas.</div>
        </div>


        <!-- NAV ENTRADAS -->
        <div class="font-menu_font0">
            <div class="text-xyzsec text-center mt-10 mb-2 text-xl">¿Qué categoría quieres editar?</div>
            <div class="text-xyzsec text-center  mb-5 text-sm">Elige una </div>
            <div class="flex gap-1 flex-wrap justify-center">
                <template v-for="(cat, cat_index) in rest.menu" class="">
                    <button :class="cat_index == filterCat ? 'bg-xyzsec font-bold text-white' : 'bg-zinc-100'"
                        @click="filterCat = cat_index" class="p-2">{{
                            cat.name }}</button>
                </template>
                <button :class="99 == filterCat ? 'bg-xyzsec font-bold text-white' : 'bg-zinc-100'" class="p-2"
                    @click="filterCat = 99">TODO</button>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-2 text-xyzsec  mt-10 text-xl text-center font-menu_font0">
            <div class="">
                <div class="">Edita</div>
                <div>
                    <Icon name="hugeicons:arrow-down-04" class="text-5xl text-xyzsec" />
                </div>
                <div class="w-full border-2 border-dashed border-b-0 border-xyzsec p-2" />
            </div>
            <div class="col-span-2 ">
                <div class=" ">Vista previa</div>
                <Icon name="hugeicons:arrow-down-04" class="text-5xl text-xyzsec" />
                <div class="w-full border-2 border-dashed border-b-0 border-xyzsec p-2" />
            </div>
        </div>
        <!-- MENU -->
        <section class="py-5" :class="[navView ? 'pointer-events-none' : '']">
            <div v-for="(cat, cat_index) in rest.menu" class="categorysection " :id="`cat_${cat_index}`">
                <div v-if="cat_index == filterCat || filterCat == 99">
                    <!--CATEGORY-->
                    <MenuadminEditWrapper istype="cat">
                        <MenuadminEditBox @open-photos="openPhotos" :photos="photos" :serverurl="serverurl"
                            v-model="cat.photos" istype="photos" title="Foto de categoría" />
                        <div v-if="cat?.photos.length" class="flex overflow-x-auto">
                            <div v-for="(pho, pho_index) in cat.photos"
                                :class="`aspect-[580/320] bg-cover bg-center w-full bg-[url(${pho})]`"></div>
                        </div>
                    </MenuadminEditWrapper>

                    <MenuadminEditWrapper istype="cat">
                        <MenuadminEditBox v-model="cat.name" istype="text" title="Nombre de categoría"
                            validation="required" />
                        <div :class="rest.style.catName">
                            <h2 class="w-2/3">{{ cat.name.toUpperCase() }}</h2>
                        </div>
                    </MenuadminEditWrapper>

                    <MenuadminEditWrapper istype="cat">
                        <MenuadminEditBox istype="textarea" v-model="cat.description"
                            title="Descripción de categoría" />
                        <div v-if="cat.description" :class="rest.style.catDescription">{{ cat.description.toUpperCase()
                            }}
                        </div>
                    </MenuadminEditWrapper>

                    <!--ARTICLE-->
                    <article v-for="(plat, plat_index) in cat.list" :class="rest.style.articleWrapper"
                        class="border-l-2 border-xyzmain">
                        <div class="w-2/3 border-t-2 border-xyzmain"></div>

                        <div class="w-1/3 text-xyzmain p-1 text-sm flex gap-2 justify-between items-center relative">
                            <div>{{ plat.name }}</div>
                            <MenuadminMoveItem @move="movePlat($event, cat_index, plat_index)" />
                            <MenuadminRemoveItem @removit="removePlat(cat_index, plat_index)" />
                        </div>


                        <MenuadminEditWrapper istype="plat">
                            <MenuadminEditBox @open-photos="openPhotos" :photos="photos" :serverurl="serverurl"
                                v-model="plat.photo" istype="photo" title="Foto de platillo" />
                            <div v-if="plat.photo"
                                :class="`aspect-[580/320] bg-cover bg-center  bg-[url(${plat.photo[1]})]`">
                            </div>
                        </MenuadminEditWrapper>


                        <MenuadminEditWrapper istype="plat">
                            <div class="flex flex-col gap-0.5">
                                <MenuadminEditBox v-model="plat.name" istype="text" title="Nombre de platillo" />
                                <MenuadminEditBox istype="textarea" v-model="plat.description"
                                    title="Descripción de platillo" />
                                <div v-auto-animate ref="variantsParentEl">

                                    <div class="flex flex-col border-l-2 border-xyzsec mt-1"
                                        v-for="(variant, variant_index ) in plat.variants" :key="variant"
                                        :data-index="variant_index">
                                        <div class="w-5/6 border-t-2 border-xyzsec"></div>
                                        <div class="p-1">
                                            <div
                                                class="text-xyzsec p-1 text-sm flex gap-2 justify-between items-center w-full relative">
                                                <div>{{ variant.name }}</div>
                                                <MenuadminMoveItem
                                                    @move="moveVariant($event, cat_index, plat_index, variant_index)" />
                                                <MenuadminRemoveItem
                                                    @removit="removeVariant(cat_index, plat_index, variant_index)" />
                                            </div>

                                            <MenuadminEditBox v-model="variant.name" istype="text"
                                                title="Nombre de variante" />
                                            <MenuadminEditBox istype="textarea" v-model="variant.description"
                                                title="Descripción de variante" />
                                            <MenuadminEditBox v-model="variant.price" istype="number"
                                                title="Precio de variante" />
                                        </div>


                                        <div class="w-12 border-b-2 border-xyzsec"></div>
                                    </div>
                                </div>

                                <div @click="addVariant(cat_index, plat_index)"
                                    class="font-menu_font0 font-bold border-2 border-dashed border-xyzsec py-1 px-2 rounded text-xyzsec bg-white text-right cursor-pointer hover:bg-xyzaccent hover:text-black flex justify-end items-center gap-2 text-sm">
                                    <Icon name="solar:add-square-line-duotone" />
                                    Añadir variante
                                </div>
                            </div>
                            <div class="flex " :class="rest.style.articleInner">
                                <div class="w-3/6 p-2 shrink-0">
                                    <div :class="rest.style.articleName">{{ plat.name }}</div>
                                    <div :class="rest.style.articleDescription">{{ plat.description }}</div>
                                </div>
                                <div class="grow flex flex-col gap-4 text-white p-2 justify-evenly "
                                    :class="rest.style.articleVariantBg">
                                    <div class="flex gap-2 text-right "
                                        v-for="(variant, variant_index ) in plat.variants">
                                        <div class="shrink-0" :class="isFontSize ? 'w-1/2' : 'w-4/6'">
                                            <div :class="rest.style.articleVariantName" class="">{{ variant.name }}
                                            </div>
                                            <div :class="rest.style.articleVariantDescription">{{ variant.description }}
                                            </div>
                                        </div>
                                        <div class="text-right grow" :class="rest.style.articleVariantPrice">
                                            {{ formatCurrency(variant.price) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MenuadminEditWrapper>
                        <MenuadminEditWrapper istype="plat">
                            <MenuadminEditBox v-model="plat.information" istype="text"
                                title="Información de platillo" />
                            <div v-if="plat.information" :class="rest.style.articleInfo">{{ plat.information }}</div>
                        </MenuadminEditWrapper>

                        <div class="w-1/3 border-b-2 border-xyzmain"></div>
                    </article>
                    <div @click="addPlat(cat_index)"
                        class="w-1/3 font-menu_font0 font-bold border-2 border-dashed border-xyzsec py-6 px-2 rounded text-xyzsec bg-white text-right cursor-pointer hover:bg-xyzaccent hover:text-black flex justify-end items-center gap-2 text-sm">
                        <Icon name="solar:add-square-line-duotone" />
                        Añadir platillo
                    </div>


                </div>
            </div> <!-- vfor -->
        </section> <!--/menu-->


    </div><!--fullmenu-->

    <MenuadminSaveMenu :menu="rest" :recordid="recordid" :photos="photos" :token="route.params.menutoken" />

</template>


<style scoped>
.formkit-outer {
    margin: 0 !important;
}

.formkit-input {
    background: rgba(255, 255, 255, 0.8);
}
</style>