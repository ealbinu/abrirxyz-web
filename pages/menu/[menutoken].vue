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


</script>

<template>





    <MenuBaseMenu :thedata="rest" />

</template>
