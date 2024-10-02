<script setup lang="ts">
const route = useRoute()

var { data: rest } = await useFetch('https://abrir.pockethost.io/m/' + route.params.menutoken.toUpperCase())

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



/*
import { animate } from "motion"
import { isClient } from '@vueuse/shared'




const navviewEl = ref<HTMLElement | null>(null)
const navigationEl = ref<HTMLElement | null>(null)
const navBtnEl = ref<HTMLElement | null>(null)
const navibtnparent = ref<HTMLElement | null>(null)
const preloader = ref<HTMLElement | null>(null)

const navActive = ref(0)
const navView = ref(false)





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
        title: rest.value.name,
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
    startIntersectionO();

};



useNuxtApp().$bus.$on('customdata', () => {
    console.log('custom DATA!!!!')
})


onMounted(() => {
    tailwindconf()
    startMounting();

    if (process.client) {



        console.log('client run')
        window.addEventListener('message', (event) => {
            // Verify the origin of the event
            if (event.origin !== window.location.origin) {
                console.warn('Untrusted origin:', event.origin);
                return;
            }

            console.log('Received message:', event.data);
        });
        console.log(window)
    }

});


const img = useImage()

const bgPhoto = (imgurl) => {
    const theimg = img(imgurl, { width: 580, height: 200 })
    return theimg
}


*/
</script>

<template>





    <MenuBaseMenu :thedata="rest" />

</template>
