import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
            /*  beforeEnter:[guardarLogin] */
        },
        {
            path: '/inicio',
            component: AppLayout,
            children: [
                {
                    path: '/inicio/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/inicio/subirArchivos',
                    name: 'subirArchivos',
                    component: () => import('@/views/pages/planeacion/subirArchivos.vue')
                }
            ]
        },
        {
            path: '/reportes',
            component: AppLayout,
            children: [
                {
                    path: '/reportes/semanales',
                    name: 'semanales',
                    component: () => import('@/views/pages/planeacion/crud.vue')
                },
                {
                    path: '/reportes/mensuales',
                    name: 'mensuales',
                    component: () => import('@/views/pages/planeacion/crud.vue')
                }
            ]
        }
    ]
});

export default router;
