<template>
    <div class="sticky top-0 z-30 p-1 bg-gradient-to-b from-white to-white/0">
        <div class="w-full bg-menu_color1 rounded flex gap-1 justify-between text-menu_color1 relative p-2  shadow-sm ">
            <div class="absolute inset-0 bg-gradient-to-b from-black/0 to-black/25  from-30% to-80% z-0"></div>

            <div class="w-1/6 ">
                <button class="menu-btn group" @click="openNavView">
                    <Icon name="mingcute:menu-fill" class="menu-btn-icon" />
                </button>
            </div>
            <div class="w-4/6 text-white text-center flex items-center justify-center">
                <div>{{ menuStore.thename }}</div>
            </div>






            <div class="w-1/6 flex gap-1 items-center justify-end relative">


                <button class="menu-btn !bg-green-600 text-white group" ref="whatsOrderBtn"
                    v-show="menuStore.whatsOrderOn" @click="menuStore.setWhatsSidebar(true)">
                    <Icon name="mingcute:paper-line" class="menu-btn-icon" />
                </button>


                <button class="menu-btn group" @click="submenu = !submenu">
                    <Icon name="mingcute:arrows-down-fill" class="menu-btn-icon" v-if="!submenu" />
                    <Icon name="mingcute:arrows-up-fill" class="menu-btn-icon" v-else />
                </button>

                <div class="absolute top-full mt-3 -right-1 p-1 flex flex-col gap-1 bg-menu_color1 rounded"
                    v-if="submenu">
                    <button class="menu-btn group ml-auto" @click="shareit()" v-show="!isSupported">
                        <Icon name="mingcute:share-forward-fill" class="menu-btn-icon" />
                    </button>
                    <button class="menu-btn group " @click="fontsizer()">
                        <Icon name="mingcute:font-size-line" class="menu-btn-icon" v-if="!menuStore.fontSize" />
                        <Icon name="mingcute:font-size-fill" class="menu-btn-icon" v-else />
                    </button>
                </div>
            </div>



        </div>
    </div>
</template>
<script setup lang="ts">
import { isClient } from '@vueuse/shared'
const props = defineProps({

})



const emit = defineEmits(['openNavView'])


const menuStore = useMenu()

const { share, isSupported } = useShare()
const isFontSize = ref(false)
const submenu = ref(false)


const shareit = () => {
    share({
        title: menuStore.thename,
        text: 'Menú digital',
        url: isClient ? location.href : '',
    })
    submenu.value = false
}



const fontsizer = () => {
    if (!menuStore.fontSize) {
        document.documentElement.style.fontSize = '20px';
        menuStore.setFontSize(true)
    } else {
        document.documentElement.style.fontSize = '';
        menuStore.setFontSize(false)
    }
    submenu.value = false
}



const openNavView = () => {
    //emit('openNavView')
    menuStore.setSidebar(true)
}

const whatsOrderBtn = ref<HTMLElement | null>(null)

watch(menuStore.thedata.menu.menu, (nvalue) => {
    whatsOrderBtn.value.classList.remove('animate__animated', 'animate__heartBeat')
    setTimeout(() => {
        whatsOrderBtn.value.classList.add('animate__animated', 'animate__heartBeat')
    }, 100)

}, { deep: true })


</script>
