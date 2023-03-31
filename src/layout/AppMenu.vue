<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Vista de datos',
        items: [
            /* { label: 'Dashboard', icon: 'pi pi-fw pi-id-card', to: '/inicio/dashboard' }, */
            {
                label: 'Flujos caja',
                icon: 'pi pi-fw pi-folder',
                items: [
                    {
                        label: 'FC Semanal',
                        icon: 'pi pi-fw pi-file-excel',
                        to: '/reportes/semanales'
                    },
                    {
                        label: 'FC Semanal Proyectado',
                        icon: 'pi pi-fw pi-file-excel',
                        to: '/reportes/esperado-semanal-proyectado'
                    },
                    {
                        label: 'FC Mensual',
                        icon: 'pi pi-fw pi-file-excel',
                        to: '/reportes/mensuales'
                    }
                ]
            }
        ]
    },
    {
        label: 'Integracion de datos',
        items: [
            {
                label: 'Ingresar saldos',
                icon: 'pi pi-fw pi-wallet',
                to: '/inicio/EsperadoSemanal'
            },
            {
                label: 'Subir archivos',
                icon: 'pi pi-fw pi-file-import',
                to: '/inicio/subirArchivos'
            }
        ]
    } /* ,
    {
        label: 'Envio de correos electronicos',
        items: [{ label: 'Correos', icon: 'pi pi-fw pi-envelope', to: '/correos' }]
    } */
]);
</script>

<style lang="scss" scoped></style>
