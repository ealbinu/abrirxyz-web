<script setup lang="ts">

const pb = usePB()
const route = useRoute()


const menuToken = route.params.menu_index.toUpperCase()
const authData = await pb.admins.authWithPassword('hola@abrir.xyz', '1906.Panza')
const thedata = await pb.collection('menu').getFirstListItem(`token="${menuToken}"`)
const filepath = 'https://abrir.pockethost.io/api/files/menu/' + thedata.id + '/'

const googleFontFamilies = thedata.styles.fonts.map(font => font.replace(/\s+/g, '+')).join('|')


useHead({
    title: thedata.branches[0].name,
    htmlAttrs: { lang: 'es' },
    meta: [
        { name: 'description', content: 'Menú digital de ' + thedata.branches[0].name }
    ],
    script: [
        { src: 'https://cdn.tailwindcss.com', tagPosition: 'head' }
    ],
    link: [
        { rel: 'icon', type: 'image/png', href: filepath + thedata.favicon },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: `https://fonts.googleapis.com/css2?family=${googleFontFamilies}&display=swap`, crossorigin: '' }
    ]
})

const menuStore = useMenu()
menuStore.setTheVariables(thedata, filepath)




</script>

<template>






    <template v-if="thedata.menu.address">
        <BaseMenu :thedata="thedata.menu" />
    </template>
    <template v-else>
        <BaseMenuv2 :thedata="thedata" :filepath="filepath" />
    </template>






</template>
