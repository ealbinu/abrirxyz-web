<script setup lang="ts">
const pb = usePB()
const route = useRoute()


const menuToken = route.params.menu_index.toUpperCase()
const authData = await pb.admins.authWithPassword('hola@abrir.xyz', '1906.Panza')
const thedata = await pb.collection('menu').getFirstListItem(`token="${menuToken}"`)
const filepath = 'https://abrir.pockethost.io/api/files/menu/' + thedata.id + '/'



useHead({
    title: thedata.branches[0].name,
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
    link: [{ rel: 'icon', type: 'image/png', href: filepath + thedata.favicon }]
})



</script>

<template>






    <template v-if="thedata.menu.address">

        <MenuBaseMenu :thedata="thedata.menu" />
    </template>
    <template v-else>
        <MenuBaseMenuv2 :thedata="thedata" :filepath="filepath" />
    </template>






</template>
