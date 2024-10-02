<script setup lang="ts">
import PocketBase from 'pocketbase'
import '@formkit/themes/genesis'
const route = useRoute()

const pb = new PocketBase('https://abrir.pockethost.io');


const { data: record, error } = await useAsyncData('menuRecord', async () => {
    try {
        return await pb.collection('menu').getFirstListItem(
            `token="${route.params.menutoken.toUpperCase()}" && id="${route.params.menuadmin}"`,
            { expand: "owner" }
        );
    } catch (err) {
        console.error('Error fetching record:', err);
        throw err;
    }
});
const formData = ref({ ...record.value.menu })





onMounted(() => {

})



</script>

<template>
    <div class="p-2 bg-xyzmain text-white text-xs flex gap-2">
        <div class="opacity-60">ADMINISTRADOR</div> <strong>{{ record.menu.name }}</strong>
    </div>
    <div class="p-5">
        <FormKit type="form" v-model="formData">
            <div class="grid md:grid-cols-3 gap-4 ">
                <template v-for="(cat, cat_index) in formData.menu">
                    <div class=" p-2 bg-gray-100 rounded">
                        <!--CATEGORIAS-->
                        <FormKit type="text" label="Nombre de la categoría" :name="formData.menu[cat_index].name"
                            v-model="formData.menu[cat_index].name" required />
                        <FormKit type="text" label="Descripción" :name="formData.menu[cat_index].description"
                            v-model="formData.menu[cat_index].description" required />
                        <!--PLATILLOS-->
                        <div class=" flex flex-col gap-4">
                            Platillos
                            <template v-for="(plat, plat_index) in cat.list">
                                <div class="bg-gray-300 p-2 rounded">
                                    <FormKit type="text" label="Nombre del platillo"
                                        :name="formData.menu[cat_index].list[plat_index].name"
                                        v-model="formData.menu[cat_index].list[plat_index].name" required />
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>

        </FormKit>
    </div>

    <hr>
    {{ formData }}

</template>