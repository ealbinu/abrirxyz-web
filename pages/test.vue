<script setup>
const { data } = await useFetch('https://abrir.pockethost.io/m/AMOLE')
</script>
<template>
{{ data }}
</template>