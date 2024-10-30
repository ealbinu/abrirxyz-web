<script setup lang="ts">





const props = defineProps({
    thedata: Object,
    hidemenu: Boolean,
    filepath: String
})


const menuStore = useMenu()

const rest = ref(props.thedata.menu)









const navView = ref(false)

menuStore.setAreas([...new Set(menuStore.themenu.map(item => item.area).filter(area => area !== undefined))])








const loadFontsNColors = async () => {
    menuStore.thestyles.fonts.forEach((font, index) => {
        document.documentElement.style.setProperty(`--menu-font${index + 1}`, font);
    });
    menuStore.thestyles.colors.forEach((color, index) => {
        document.documentElement.style.setProperty(`--menu-color${index + 1}`, color);
    });
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




function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let catindex = entry.target.id.replace('cat_', '')
            menuStore.setActiveNav(catindex, true)

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


const startMounting = async () => {
    loadFontsNColors();
    scrollObserver();
};



onMounted(() => {
    tailwindconf()
    startMounting();
});





</script>

<template>

    <div class="digital-menu-content rs-content dmenuv2" :class="menuStore.thestyles?.content || 'bg-white'">

        <MenuPreloading />




        <div class="font-menu_font1 max-w-xl mx-auto">
            <!-- :class="rest.bgpattern ? `bg-[url(${rest.bgpattern})] bg-repeat-x bg-[length:128px]` : ''" -->
            <MenuNavBar />



            <MenuNavSidebar />
            <MenuLogo />

            <MenuWhatsOrder v-if="menuStore.whatsOrder" />

            <MenuAreas />

            <!-- THE MENU -->
            <section class="py-5" v-auto-animate>
                <MenuCategory v-for="(cat, cat_index) in menuStore.menu_render" :index="cat_index" :cat="cat" />
            </section> <!--/menu-->


            <div class="my-5 text-center w-full" v-if="menuStore.whatsOrderOn">
                <div @click="menuStore.setSidebar2(true)"
                    class="bg-green-600 text-white rounded-full w-fit mx-auto px-4 py-2 text-xl flex gap-2 items-center cursor-pointer hover:bg-white hover:text-green-600">
                    <span>
                        ¿Has terminado? Revisa tu orden
                    </span>
                </div>
            </div>




            <footer class="flex flex-col gap-5 p-2">
                <div :class="menuStore.thestyles.legals" class="rs-legals">{{ menuStore.thebranches[0].legals }}</div>

                <MenuLogo />

                <div v-if="menuStore.thebranches[0].message" :class="menuStore.thestyles.message" class="rs-Message"
                    v-html="menuStore.thebranches[0].message" />


                <div class="flex gap-2 flex-wrap justify-center items-center">
                    <a v-for="(phone, index) in menuStore.thebranches[0].phone" :href="`tel:${phone}`"
                        class="rs-phones flex items-center gap-2 justify-center" :class="menuStore.thestyles.phones">
                        <Icon name="solar:phone-calling-line-duotone" class="text-xl" />
                        {{ phone }}
                    </a>
                </div>
                <div>
                    <a v-if="menuStore.thebranches[0].addressLink" :href="menuStore.thebranches[0].addressLink"
                        target="_blank" :class="menuStore.thestyles.address"
                        class="rs-address flex justify-center items-center gap-2">
                        <Icon name="solar:map-point-linear" class="text-xl" />
                        <div>{{ menuStore.thebranches[0].address }}</div>
                    </a>
                    <div v-else :class="menuStore.thestyles.address" class="rs-address">{{
                        menuStore.thebranches[0].address }}
                    </div>
                </div>

                <div class="flex gap-5 flex-wrap justify-center items-center text-3xl">
                    <a v-if="menuStore.thebranches[0].social" v-for="(url, index) in menuStore.thebranches[0].social"
                        :href="url" class="rs-social" :class="menuStore.thestyles.social">

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

    <div class="opacity-50 text-[1px]">
        <Icon name="mingcute:minus-circle-line" />
        <Icon name="mingcute:add-circle-line" />
        <Icon name="mingcute:close-fill" />
        <Icon name="mingcute:paper-line" />
        <Icon name="mingcute:arrows-down-fill" />
        <Icon name="mingcute:arrows-up-fill" />
        <Icon name="mingcute:share-forward-fill" />
        <Icon name="mingcute:font-size-line" />
        <Icon name="mingcute:font-size-fill" />
    </div>

</template>


<style lang="postcss">
.menu-btn {
    @apply cursor-pointer flex text-xl items-center gap-1 p-2 shadow-lg bg-white hover:text-white hover:bg-menu_color1 rounded-sm relative z-10 aspect-square transition-all hover:shadow-2xl
}

.menu-btn-icon {
    @apply group-hover:scale-125 transition-all group-hover:-rotate-12
}
</style>