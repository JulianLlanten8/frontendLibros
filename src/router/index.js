import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { guardsRoute, guardsLogin /* checkRole */ } from './auth-guard';

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
                    path: '/inicio/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/inicio/subirArchivos',
                    name: 'subirArchivos',
                    component: () => import('@/views/pages/planeacion/SubirArchivos.vue')
                },
                {
                    path: '/inicio/saldos',
                    name: 'saldos',
                    component: () => import('@/views/pages/planeacion/Saldos.vue')
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
                    component: () => import('@/views/pages/planeacion/ReporteSemanal.vue')
                },
                {
                    path: '/reportes/mensuales',
                    name: 'mensuales',
                    component: () => import('@/views/pages/planeacion/ReporteMensual.vue')
                },
                {
                    path: '/reportes/esperado-semanal-proyectado',
                    name: 'esperado-semanal-proyectado',
                    component: () => import('@/views/pages/planeacion/FlujoSemanalProyectado.vue')
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
