<script setup lang="ts">
const route = useRoute()
</script>
<template>
    HOLA!
    {{ route.params.menutoken }}
    {{ route.params.menuadmin }}

</template>