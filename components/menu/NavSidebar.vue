<template>
    <div v-if="isvisible">
        <div :class="menuStore.navSidebarView ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'"
            ref="sidebarBg" class="fixed inset-0 bg-black/60 z-30 cursor-pointer" @click="menuStore.setSidebar(false)">
        </div>

        <div ref="navviewEl"
            :class="menuStore.navSidebarView ? 'animate__animated animate__slideInLeft' : 'animate__animated animate__slideOutLeft'"
            class="fixed top-4 bottom-4 left-0 w-2/3  max-w-96  animate__faster rounded-r-sm shadow-xl bg-white z-40 flex flex-col ">


            <button class="menu-btn group !absolute -top-1 -right-1 text-menu_color1"
                @click="menuStore.setSidebar(false)">
                <Icon name="mingcute:close-fill" class="menu-btn-icon" />
            </button>


            <div class="mx-auto max-w-64">
                <MenuLogo />
            </div>

            <MenuAreas class="my-3" />

            <div class="overflow-y-auto w-full grow  flex flex-col items-start p-2 gap-2">
                <div v-for="(item, index) in menuStore.menu_render"
                    class="cursor-pointer rounded-sm bg-gray-100 w-full p-1 "
                    :class="[menuStore.activeNav == index ? 'bg-menu_color1 text-white' : '']"
                    @click="selectNavActive(index)">
                    <span class="rs-navAll rs-navActive rs-navInactive">
                        {{ item.name.toUpperCase() }}
                    </span>
                </div>
            </div>




        </div>

    </div>
</template>

<script setup lang="ts">
import { animate } from "motion"


const navviewEl = ref<HTMLElement | null>(null)



const props = defineProps({

})
const emit = defineEmits(['selectNavActive'])
const menuStore = useMenu()
const closeit = () => {
    emit('closeView')
}
const sidebarBg = ref<HTMLElement | null>(null)
const sidebarBox = ref<HTMLElement | null>(null)

const isvisible = ref(false)


const selectNavActive = (index) => {
    emit('selectNavActive', index)
    menuStore.setSidebar(false)
    menuStore.setActiveNav(index)

}




onMounted(() => {
    watch(() => menuStore.navSidebarView, (navValue) => {

        if (navValue) {
            isvisible.value = true
        } else {
            setTimeout(() => {
                isvisible.value = false
            }, 500)
        }
    })

    const { isSwiping: navviewIsSwiping, direction: navviewDirection } = useSwipe(navviewEl)

    watch(() => navviewDirection, (nV, oV) => {
        console.log(nV)
        if (nV == 'left') {
            menuStore.setSidebar(false)
        }
    })
})

</script>