<template>

    <div v-if="isvisible">
        <div :class="menuStore.navSidebarView2 ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'"
            ref="sidebarBg" class="fixed inset-0 bg-black/60 z-30 cursor-pointer" @click="closeSidebar">
        </div>

        <div ref="navviewEl"
            :class="menuStore.navSidebarView2 ? 'animate__animated animate__slideInRight' : 'animate__animated animate__slideOutRight'"
            class="p-0 fixed top-4 bottom-4 right-0 w-4/5  max-w-96  animate__faster rounded-r-sm shadow-xl bg-white z-40 flex flex-col ">


            <button class="menu-btn group !absolute -top-1 -left-1 text-menu_color1" @click="closeSidebar">
                <Icon name="mingcute:close-fill" class="menu-btn-icon" />
            </button>

            <h1 class="text-center font-bold text-2xl mt-2 p-2">Tu orden</h1>

            <div class="overflow-y-auto mt-1 w-full grow  flex flex-col items-start p-1 gap-1">

                <div v-for="(cat, cat_index) in filteredMenu" class="w-full">
                    <div v-html="cat.name" class="text-sm font-bold text-menu_color2" />

                    <div v-for="(plat, plat_index) in cat.list" class="rounded-sm p-1 w-full">

                        <div v-html="plat.name" class="text-xl font-bold text-menu_color1" />

                        <div class="flex flex-col gap-1 w-full ">
                            <!-- VARIANT ITEM -->
                            <div v-for="(variant, variant_index) in plat.variants" v-if="plat?.variants"
                                class="grid grid-cols-5 gap-2 bg-gray-100  rounded-sm w-full">
                                <div class="col-span-3 leading-4 p-1">
                                    {{ variant.name }} <br> <span class="opacity-60">{{ variant.description }}</span>
                                </div>
                                <div class="text-right  p-1">
                                    <span class="text-menu_color1 font-bold ">{{ variant.qty }}x</span> <span
                                        v-html="formatCurrency(variant.price)" />
                                </div>
                                <div class="text-right bg-menu_color1 p-1 font-bold text-white rounded-r-sm"
                                    v-html="formatCurrency(variant.total)" />
                            </div>
                            <div v-else>
                                <!-- SIMPLE ITEM -->
                                <div class="grid grid-cols-3 gap-2 bg-gray-100  rounded-sm w-full">
                                    <div></div>
                                    <div class="p-1  text-right">
                                        <span class="text-menu_color1 font-bold">{{ plat.qty }}x</span> <span
                                            v-html="formatCurrency(plat.price)" />
                                    </div>
                                    <div class="text-right bg-menu_color1 p-1 font-bold text-white rounded-r-sm"
                                        v-html="formatCurrency(plat.total)" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div v-if="totalSum == 0"
                    class="text-xl px-5 py-10 text-center text-green-600 font-bold w-full bg-slate-100 rounded-sm">
                    Aún no has agregado ningún platillo a tu orden
                </div>

                <div class="bg-menu_color1 p-2  text-white text-xl w-full grid grid-cols-2">
                    <div class="">Total</div>
                    <div class="text-right" v-html="formatCurrency(totalSum)" />
                </div>

                <div class="my-5 text-center w-full" v-if="totalSum > 0">
                    <div @click="SendOrder()"
                        class="bg-green-600 text-white rounded-full w-fit mx-auto px-4 py-2 text-xl flex gap-2 items-center cursor-pointer hover:bg-white hover:text-green-600">
                        <span>
                            Enviar orden por Whatsapp
                        </span>
                        <Icon name="logos:whatsapp-icon" />

                    </div>
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

const menuStore = useMenu()

const sidebarBg = ref<HTMLElement | null>(null)
const sidebarBox = ref<HTMLElement | null>(null)

const isvisible = ref(false)



const openNavView = () => {
    menuStore.setSidebar2(true)
}



const closeSidebar = () => {
    nextTick(() => {
        menuStore.setSidebar2(false)
    })
}




const filteredMenu = computed(() => {
    const menuData = JSON.parse(JSON.stringify(menuStore.thedata.menu.menu));

    return menuData.map(category => {
        return {
            ...category,
            list: category.list.map(item => {
                const filteredVariants = item.variants?.filter(variant => variant.qty > 0)
                    .map(variant => ({
                        ...variant,
                        total: variant.price * variant.qty
                    })) || [];

                if (filteredVariants.length > 0) {
                    return {
                        ...item,
                        variants: filteredVariants,
                        total: filteredVariants.reduce((acc, variant) => acc + variant.total, 0)
                    };
                }

                if (item.qty > 0) {
                    return {
                        ...item,
                        total: item.price * item.qty
                    };
                }

                return null;
            }).filter(Boolean)
        };
    }).filter(category => category.list.length > 0);
});

// Compute totalSum based on filteredMenu
const totalSum = computed(() => {
    return filteredMenu.value.reduce((categoryAcc, category) => {
        return categoryAcc + category.list.reduce((itemAcc, item) => itemAcc + item.total, 0);
    }, 0);
});





const formatCurrency = (value) => {
    const formatted = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(value);

    const [integerPart, decimalPart] = formatted.split('.');

    return decimalPart
        ? `${integerPart}<sup class="text-[8px] align-middle opacity-80  translate-x-0.5 -translate-y-0.5">${decimalPart}</sup>`
        : integerPart; // Handles cases where there is no decimal part
};

function orderdate() {
    const ahora = new Date(), m = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    return `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}${m[ahora.getMonth()]}${String(ahora.getFullYear()).slice(-2)}`;
}

const generateWhatsAppMessage = (orderData) => {
    let total = 0;
    let message = ``;
    message += `📋 *Orden:* ${orderdate()} \n\n`;
    message += `https://abrir.xyz/${menuStore.thedata.token}\n\n`;


    orderData.forEach(category => {

        category.list.forEach(plat => {
            let messagePlat = ''
            if (plat?.variants && plat?.variants.length) {
                plat.variants.forEach(variation => {
                    let variationstxt = variation.name + ' ' + variation.description
                    variationstxt = variationstxt ? '(' + variationstxt + ')' : ''
                    messagePlat += `- ${variation.qty} x *${plat.name}* ${variationstxt} : $${variation.total}\n`
                })
            } else {
                // Simple
                messagePlat += `- ${plat.qty} x *${plat.name}* : $${plat.total}\n`
            }
            message += messagePlat
        })
    })



    message += `\n *TOTAL: $${totalSum.value}*`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = menuStore.whatsOrder; // Reemplaza con el número de teléfono deseado
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    umTrackEvent('whatsapp-order', { menu: menuStore.thedata.token });


    return { message, whatsappLink };
}


const SendOrder = async () => {


    const { message, whatsappLink } = generateWhatsAppMessage(filteredMenu.value)


    await navigateTo(whatsappLink, {
        open: {
            target: '_blank',
            windowFeatures: {
                width: 500,
                height: 500
            }
        }
    })

}


const closeVisible = () => {
    if (menuStore.navSidebarView2) {
        isvisible.value = true
    } else {
        setTimeout(() => {
            isvisible.value = false
        }, 500)
    }
}


onMounted(() => {
    watch(() => menuStore.navSidebarView2, (navValue) => {
        closeVisible()
    })



    closeVisible()

})

</script>