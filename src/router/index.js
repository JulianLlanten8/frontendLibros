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
                    path: '/inicio/SubirArchivos',
                    name: 'SubirArchivos',
                    component: () => import('@/views/pages/planeacion/crud.vue')
                },
                {
                    path: '/inicio/SubirArchivos',
                    name: 'SubirArchivos',
                    component: () => import('@/views/pages/planeacion/crud.vue')
                }
            ]
        }
    ]
});

export default router;
