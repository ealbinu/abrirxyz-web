<template>
    <div ref="wabtn" @click="startOrder()"
        :class="menuStore.whatsOrderOn ? 'bg-slate-600 hover:bg-slate-800' : 'bg-green-600 hover:bg-green-800'"
        class="relative  my-5 text-white rounded-full w-fit mx-auto px-3 py-2 flex gap-2 items-center cursor-pointer ">
        <template v-if="!menuStore.whatsOrderOn">
            <Icon name="mingcute:paper-line" class="menu-btn-icon" />
            Arma tu orden
            <Icon name="logos:whatsapp-icon" />
        </template>
        <template v-else>
            Regresar a menú digital
        </template>
        <div class=" z-50 absolute  inset-0 flex justify-center items-center">
            <div class="w-1 opacity-0 aspect-square rounded-full "
                :class="endTransition ? 'bg-slate-300' : 'bg-green-600'" ref="wawave"></div>
        </div>
    </div>

    <MenuWhatsCart v-if="menuStore.whatsOrderOn" />

    <div v-if="menuStore.whatsOrderOn" class=" text-center my-2 p-5 text-xl">
        <div
            class=" bg-white  flex flex-wrap gap-1 justify-center items-center text-green-600 font-bold animate__animated animate__heartBeat">
            Arma tu orden
            <Icon name="mingcute:paper-line" class="text-xl" />
            usando los botones
            <Icon name="mingcute:minus-circle-line" class="text-xl" />
            <Icon name="mingcute:add-circle-line" class=" text-xl" />
        </div>
    </div>

</template>

<script setup lang="ts">
import { animate } from "motion"

const props = defineProps({

})
const menuStore = useMenu()

const wabtn = ref<HTMLElement | null>(null)
const wawave = ref<HTMLElement | null>(null)
const endTransition = ref(false)
const startOrder = () => {

    const stateSet = menuStore.whatsOrderOn

    animate(wawave.value, { opacity: [0, 1, 1], scale: [0, 300] }, { duration: 0.6 }).finished
        .then(() => {
            menuStore.setWhatsOrder(!stateSet)
            animate(wawave.value, { scale: [300, 0] }, { duration: 0.4 }).finished
                .then(() => {
                    endTransition.value = !stateSet
                })
        })

}
</script>