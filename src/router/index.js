import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { guardsRoute, guardsLogin, checkRole } from './auth-guard';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/reset-password',
            name: 'reset-password',
            component: () => import('@/views/pages/auth/RecuperacionContrasena.vue'),
            beforeEnter: [guardsLogin]
        },
        {
            path: '/olvido-contrasena',
            name: 'olvido-contrasena',
            component: () => import('@/views/pages/auth/OlvidoContrasena.vue'),
            beforeEnter: [guardsLogin]
        },
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue'),
            beforeEnter: [guardsLogin]
        },
        {
            path: '/inicio',
            component: AppLayout,
            beforeEnter: [guardsRoute],
            children: [
                {
                    path: '/inicio/usuarios',
                    name: 'usuarios',
                    component: () => import('@/views/pages/planeacion/AdministracionUsuarios.vue'),
                    beforeEnter: [guardsRoute, checkRole],
                    meta: { Administrador: true }
                },
                {
                    path: '/inicio/subirArchivos',
                    name: 'subirArchivos',
                    component: () => import('@/views/pages/planeacion/SubirArchivos.vue'),
                    beforeEnter: [guardsRoute, checkRole],
                    meta: { Administrador: true, GestionFinanciera: true }
                },
                {
                    path: '/inicio/saldos',
                    name: 'saldos',
                    component: () => import('@/views/pages/planeacion/Saldos.vue'),
                    beforeEnter: [guardsRoute, checkRole],
                    meta: { Administrador: true, GestionFinanciera: true }
                }
            ]
        },
        {
            path: '/reportes',
            component: AppLayout,
            beforeEnter: [guardsRoute],
            children: [
                {
                    path: '/reportes/semanales',
                    name: 'semanales',
                    component: () => import('@/views/pages/planeacion/ReporteSemanal.vue'),
                    beforeEnter: [guardsRoute, checkRole],
                    meta: { Administrador: true, GestionFinanciera: true }
                },
                {
                    path: '/reportes/mensuales',
                    name: 'mensuales',
                    component: () => import('@/views/pages/planeacion/ReporteMensual.vue'),
                    beforeEnter: [guardsRoute, checkRole],
                    meta: { Administrador: true }
                },
                {
                    path: '/reportes/esperado-semanal-proyectado',
                    name: 'esperado-semanal-proyectado',
                    component: () => import('@/views/pages/planeacion/FlujoSemanalProyectado.vue'),
                    beforeEnter: [guardsRoute, checkRole],
                    meta: { Administrador: true }
                }
            ]
        },
        {
            path: '/correos',
            component: AppLayout,
            beforeEnter: [guardsRoute],
            children: [
                {
                    path: '/correos',
                    name: 'correos',
                    component: () => import('@/views/pages/planeacion/Correos.vue')
                }
            ]
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: () => import('@/views/pages/NotFound.vue')
        }
    ]
});

export default router;
