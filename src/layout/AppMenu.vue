<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in menuConPermisos" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
onMounted(() => {
    menuConPermisos.value = menubar();
});
const menuConPermisos = ref([]);
const model = ref([
    {
        label: 'Libros',
        items: [
            {
                label: 'CRUD',
                icon: 'pi pi-fw pi-folder',
                items: [
                    {
                        label: 'Administracion de libros',
                        icon: 'pi pi-fw pi-folder-open',
                        to: '/'
                    }
                ]
            },
            {
                label: 'Libros Online',
                icon: 'pi pi-fw pi-book',
                to: '/libros-online'
            }
        ]
    }
]);

const menubar = () => {
    return model.value;
};
</script>

<style lang="scss" scoped></style>
