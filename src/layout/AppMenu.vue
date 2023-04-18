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
                        to: '/reportes/semanales',
                        rol: ['Administrador']
                    },
                    {
                        label: 'FC Semanal Proyectado',
                        icon: 'pi pi-fw pi-file-excel',
                        to: '/reportes/esperado-semanal-proyectado',
                        rol: ['Administrador']
                    },
                    {
                        label: 'FC Mensual',
                        icon: 'pi pi-fw pi-file-excel',
                        to: '/reportes/mensuales',
                        rol: ['Administrador']
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
                to: '/inicio/saldos',
                roles: ['Administrador']
            },
            {
                label: 'Subir archivos',
                icon: 'pi pi-fw pi-file-import',
                to: '/inicio/subirArchivos',
                roles: ['GestionFinanciera']
            }
        ]
    },
    {
        label: 'Administración del sistema',
        items: [
            {
                label: 'Administracion de usuarios',
                icon: 'pi pi-fw pi-users',
                to: '/inicio/usuarios',
                roles: ['Administrador']
            }
        ]
    }
    /* ,
    {
        label: 'Envio de correos electronicos',
        items: [{ label: 'Correos', icon: 'pi pi-fw pi-envelope', to: '/correos' }]
    } */
]);

const permisos = ref(JSON.parse(sessionStorage.getItem('USER'))?.permisos?.roles);
const menubar = () => {
    if (permisos.value.includes('GestionFinanciera')) {
        model.value = model.value.filter((items) => items.label === 'Integracion de datos');
        return model.value.map((item) => {
            item.items = item.items.filter((item) => item.roles.includes('GestionFinanciera'));
            return item;
        });
    }
    if (permisos.value.includes('Administrador')) {
        return model.value;
    }
};
</script>

<style lang="scss" scoped></style>
