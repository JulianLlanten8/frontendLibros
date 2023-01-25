<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([

    {
        label: 'Integracion de datos',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-id-card', to: '/inicio/dashboard' },
            {
                label: 'Reportes', icon: 'pi pi-fw pi-folder', items: [
                    {
                        label: 'Semanales',
                        icon: 'pi pi-fw pi-file-excel',
                        to: '/inicio/SubirArchivos'
                    },
                    {
                        label: 'Mensuales',
                        icon: 'pi pi-fw pi-file-excel',
                        to: '/inicio/SubirArchivos'
                    }
                ]
            },
            { label: 'Subida de archivos', icon: 'pi pi-fw pi-file-import', },
        ]
    },
    {
        label: 'Envio de correos electronicos',
        items: [
            { label: 'Correos', icon: 'pi pi-fw pi-envelope', to: '/inicio/dashboard' }
        ]
    },

]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>

    </ul>
</template>

<style lang="scss" scoped>

</style>
