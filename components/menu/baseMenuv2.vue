<script setup lang="ts">
import { animate } from "motion"
import { isClient } from '@vueuse/shared'

const props = defineProps({
    thedata: Object,
    hidemenu: Boolean,
    filepath: String
})

const rest = ref(props.thedata.menu)


const thelogo = props.filepath + props.thedata.logo
const themenu = props.thedata.menu.menu
const thebranches = props.thedata.branches
const thestyles = props.thedata.styles




const navviewEl = ref<HTMLElement | null>(null)
const navigationEl = ref<HTMLElement | null>(null)
const navBtnEl = ref<HTMLElement | null>(null)
const navibtnparent = ref<HTMLElement | null>(null)
const preloader = ref<HTMLElement | null>(null)

const navActive = ref(0)
const navView = ref(false)







const menu_areas = [...new Set(themenu.map(item => item.area))];

const selected_area = ref(menu_areas[0])

const menu_render = computed(() => {
    if (themenu) {
        return themenu.filter((i) => i.area === selected_area.value);
    } else {
        return []
    }
})



console.log('areas:', menu_areas)

const selectNavActive = (index) => {
    if (index == 99) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        navActive.value = 0
    } else {
        navActive.value = index
        document.getElementById("cat_" + index).scrollIntoView({ behavior: 'smooth' });
    }
    closeNavView()
}




const { isSwiping: navviewIsSwiping, direction: navviewDirection } = useSwipe(navviewEl)

watch(
    navviewDirection,
    (nV, oV) => {
        if (nV == 'up') {
            closeNavView()
        }
    })

const openNavView = () => {
    nextTick(() => {
        animate(navviewEl.value, { y: [-window.innerHeight, 0] }, { duration: 0.4 })
        document.body.classList.add('overflow-hidden')
    })
    navView.value = true
}
const closeNavView = () => {
    animate(navviewEl.value, { y: [0, -window.innerHeight] }, { duration: 0.6 }).finished.then(() => {
        navView.value = false;
        document.body.classList.remove('overflow-hidden')
    },);
}

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(value);
};



const loadFonts = async () => {
    const WebFont = await import('webfontloader');
    if (thestyles.fonts.length) {
        WebFont.load({
            google: { families: thestyles.fonts }
        });
        document.documentElement.style.setProperty('--menu-font1', thestyles.fonts[0]);
        document.documentElement.style.setProperty('--menu-font2', thestyles.fonts[1]);
    }
}

const loadColors = () => {
    document.documentElement.style.setProperty('--menu-color1', thestyles.colors[0]);
    document.documentElement.style.setProperty('--menu-color2', thestyles.colors[1]);
    document.documentElement.style.setProperty('--menu-color3', thestyles.colors[2]);
}


const preloading = ref(true)

var lastLoadTime = 0;
const checkloader = () => {
    lastLoadTime = performance.now();
    // Start a timer to check after 500ms
    setTimeout(() => {
        let currentTime = performance.now();
        let timeDiff = currentTime - lastLoadTime;
        if (timeDiff >= 500) {
            animate(preloader.value, { y: [-window.innerHeight], opacity: 0 }, { duration: .8 }).finished.then(() => {
                preloading.value = false
            })
        }
    }, 500);

}


function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let catindex = entry.target.id.replace('cat_', '')
            navActive.value = catindex
        }
    });
}
const scrollObserver = () => {
    const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.3
    });
    document.querySelectorAll('.categorysection').forEach(section => {
        observer.observe(section);
    });
}


const isFontSize = ref(false)
const fontsizer = () => {
    if (!isFontSize.value) {
        document.documentElement.style.fontSize = '20px';
        isFontSize.value = true
    } else {
        document.documentElement.style.fontSize = '';
        isFontSize.value = false
    }
}

const { share, isSupported } = useShare()
const shareit = () => {
    share({
        title: thebranches[0].name,
        text: 'Menú digital',
        url: isClient ? location.href : '',
    })
}


const startIntersectionO = () => {
    new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
            navBtnEl.value.classList.add('fixed', 'sided')
            animate(navBtnEl.value, { x: [200, 0] }, { duration: .8 })
        } else {
            navBtnEl.value.classList.remove('fixed', 'sided')

        }
    }).observe(navigationEl.value);
}




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
    checkloader();
    scrollObserver();
    if (!props.hidemenu) {
        startIntersectionO();
    }

};


const img = useImage()
const bgPhoto = (imgurl) => {
    const theimg = img(imgurl, { width: 580, height: 200 })
    return theimg
}





onMounted(() => {
    tailwindconf()
    startMounting();
});









</script>

<template>

    <div class="digital-menu-content rs-content" :class="thestyles?.content || 'bg-white'">


        <div :class="thestyles?.preloading || 'bg-white'"
            class="fixed  inset-0 flex justify-center items-center z-50 flex-col gap-5 rs-preloading" ref="preloader"
            v-if="preloading">

            <img :src="thelogo" :alt="thebranches[0].name" class="mx-auto w-full rs-logos" :class="thestyles.logos">
            <div :class="thestyles.restname" class="rs-restname">{{ thebranches[0].name }}</div>
            <Icon name="solar:refresh-circle-line-duotone" class="text-4xl animate-spin rs-preloadingIcon"
                :class="thestyles?.preloadingIcon"></Icon>
        </div>

        <div class="font-menu_font1 max-w-xl mx-auto"
            :class="rest.bgpattern ? `bg-[url(${rest.bgpattern})] bg-repeat-x bg-[length:128px]` : ''">
            <!-- LOGO -->
            <div class="text-center p-5">
                <img :src="thelogo" :alt="thebranches[0].name" class="mx-auto w-full" :class="thestyles.logos">
                <h1 :class="thestyles.restname" class="rs-restname">{{ thebranches[0].name }}</h1>
            </div>
            <!--NAVIGATION-->
            <section ref="navigationEl">
                <div class="text-center text-2xl flex justify-center gap-2 p-2 " ref="navibtnparent">

                    <button alt="Cambiar tamaño de texto" title="Tamaño de texto"
                        class="flex items-center gap-1 font-bold p-2 shadow-md rounded cursor-pointer rs-navBtn"
                        @click="fontsizer()" :class="[thestyles.navBtn]">
                        <Icon name="solar:list-arrow-up-bold-duotone" v-show="!isFontSize" />
                        <Icon name="solar:list-arrow-down-bold-duotone" v-show="isFontSize" />
                    </button>
                    <button alt="Compartir" title="Compartir" v-show="isSupported"
                        class="flex items-center gap-1 font-bold p-2 shadow-md rounded cursor-pointer rs-navBtn"
                        @click="shareit()" :class="thestyles.navBtn">
                        <Icon name="solar:share-circle-bold-duotone" />
                    </button>
                    <button alt="Menú" title="Menú" @click="openNavView" ref="navBtnEl"
                        class="flex items-center gap-1 font-bold ml-auto p-2 shadow-md rounded top-1 right-1 z-20 cursor-pointer rs-navBtn"
                        :class="thestyles.navBtn">
                        <Icon name="solar:documents-bold-duotone" />
                        Menú
                    </button>
                </div>


                <div ref="navviewEl" v-show="navView"
                    class="fixed top-0 left-4 right-4 bottom-4 z-50 rounded-b shadow-2xl p-5 flex flex-col rs-navBg"
                    :class="thestyles.navBg">
                    <div class="text-center" @click="selectNavActive(99)">
                        <img :src="thelogo" :alt="rest.name" class="mx-auto w-full rs-logoNav"
                            :class="thestyles.logoNav">
                    </div>
                    <div class="overflow-y-auto w-full h-full flex flex-col items-start justify-evenly p-2 gap-5">
                        <div v-for="(item, index) in menu_render" class="cursor-pointer"
                            :class="[navActive == index ? '' : '']" @click="selectNavActive(index)">
                            <span class="rs-navAll rs-navActive rs-navInactive"
                                :class="[thestyles.navAll, navActive == index ? thestyles.navActive : thestyles.navInactive]">
                                {{ item.name.toUpperCase() }}
                            </span>
                        </div>
                    </div>
                    <button @click="closeNavView"
                        class=" flex items-center gap-2 mx-auto  font-bold   p-2 shadow-md rounded  cursor-pointer rs-navBtnClose"
                        :class="thestyles.navBtnClose">
                        <Icon name="solar:documents-bold-duotone" />
                        Cerrar
                    </button>
                </div>
            </section>

            <MenuAreas :areas="menu_areas" :styles="thestyles" v-model="selected_area" />

            <!-- THE MENU -->
            <section class="py-5" :class="[navView ? 'pointer-events-none' : '']">
                <div v-for="(cat, cat_index) in menu_render" class="categorysection" :id="`cat_${cat_index}`"
                    v-auto-animate>


                    <!--CATEGORY-->

                    <div v-if="cat.photos" class="flex overflow-x-auto">
                        <div v-for="(pho, pho_index) in cat.photos"
                            :class="`aspect-[580/320] bg-cover bg-center w-full bg-[url(${pho})]`"></div>
                    </div>


                    <div :class="thestyles.catName" class="rs-catName">
                        <h2 class="w-2/3">{{ cat.name.toUpperCase() }}</h2>
                    </div>
                    <div v-if="cat.description" class="rs-catDescription" :class="thestyles.catDescription"
                        v-auto-animate>{{
                            cat.description.toUpperCase() }}
                    </div>

                    <!--ARTICLE-->
                    <article v-for="(plat, plat_index) in cat.list" :class="thestyles.articleWrapper" v-auto-animate
                        class="rs-articleWrapper">

                        <div v-if="plat.photo"
                            :class="`aspect-[580/320] bg-cover bg-center  bg-[url(${plat.photo[1]})]`">
                        </div>

                        <div class="flex rs-articleInner" :class="thestyles.articleInner">
                            <div class="w-3/6 p-2 shrink-0">
                                <div class="rs-articleName" :class="thestyles.articleName">{{ plat.name }}</div>
                                <div class="rs-articleDescription" :class="thestyles.articleDescription"
                                    v-html="plat.description"></div>
                            </div>
                            <div class="grow flex flex-col gap-4 text-white p-2 justify-evenly rs-articleVariantBg"
                                :class="thestyles.articleVariantBg">

                                <div class="flex gap-2 text-right " v-for="(variant, variant_index ) in plat.variants"
                                    v-if="plat.variants">
                                    <div class="shrink-0" :class="isFontSize ? 'w-1/2' : 'w-4/6'">
                                        <div :class="thestyles.articleVariantName" class="rs-articleVariantName">{{
                                            variant.name }}</div>
                                        <div :class="thestyles.articleVariantDescription"
                                            class="rs-articleVariantDescription">{{ variant.description }}
                                        </div>
                                    </div>
                                    <div class="text-right grow rs-articleVariantPrice"
                                        :class="thestyles.articleVariantPrice">
                                        {{ formatCurrency(variant.price) }}
                                    </div>
                                </div>
                                <!--simple dish-->
                                <div v-else>
                                    <div class="text-right grow rs-articleVariantPrice"
                                        :class="thestyles.articleVariantPrice">
                                        {{ formatCurrency(plat.price) }}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div v-if="plat.information" :class="thestyles.articleInfo" class="rs-articleInfo">{{
                            plat.information }}</div>
                    </article>


                </div> <!-- vfor -->
            </section> <!--/menu-->





            <div class="flex flex-wrap items-start justify-center p-2 gap-x-5 gap-y-2">
                <div v-for="(item, index) in menu_render" class="cursor-pointer rs-navFooterAll"
                    :class="thestyles.navFooterAll" @click="selectNavActive(index)">
                    {{ item.name.toUpperCase() }}
                </div>
            </div>

            <footer class="flex flex-col gap-5 p-2">



                <div :class="thestyles.legals" class="rs-legals">{{ thebranches[0].legals }}</div>

                <!-- LOGO -->
                <div class="text-center p-5">
                    <img :src="thelogo" :alt="rest.name" class="mx-auto w-full rs-logos" :class="thestyles.logos">
                </div>

                <div v-if="thebranches[0].message" :class="thestyles.message" class="rs-Message"
                    v-html="thebranches[0].message" />


                <div class="flex gap-2 flex-wrap justify-center items-center">
                    <a v-for="(phone, index) in thebranches[0].phone" :href="`tel:${phone}`"
                        class="rs-phones flex items-center gap-2 justify-center" :class="thestyles.phones">
                        <Icon name="solar:phone-calling-line-duotone" class="text-xl" />
                        {{ phone }}
                    </a>
                </div>
                <div>
                    <a v-if="thebranches[0].addressLink" :href="thebranches[0].addressLink" target="_blank"
                        :class="thestyles.address" class="rs-address flex justify-center items-center gap-2">
                        <Icon name="solar:map-point-linear" class="text-xl" />
                        <div>{{ thebranches[0].address }}</div>
                    </a>
                    <div v-else :class="thestyles.address" class="rs-address">{{ thebranches[0].address }}</div>
                </div>

                <div class="flex gap-5 flex-wrap justify-center items-center text-3xl">
                    <a v-if="rest.social" v-for="(url, index) in rest.social" :href="url" class="rs-social"
                        :class="thestyles.social">

                        <Icon name="logos:facebook" v-if="url.includes('facebook')" />
                        <Icon name="logos:instagram-icon" v-if="url.includes('instagram')" />

                    </a>
                </div>

            </footer>


        </div><!--fullmenu-->


        <div class="p-5">
            <a title="Ir a TalachaDigital.com" alt="Ir a TalachaDigital.com" href="https://talachadigital.com"
                target="_blank" class="block mx-auto w-20 my-10">
                <MenuTalachadigitalLogo />
            </a>
        </div>
    </div>
</template>