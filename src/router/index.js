import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'libros-crud',
                    component: () => import('@/views/pages/libros/Crud.vue')
                },
                {
                    path: '/libros-online',
                    name: 'libros',
                    component: () => import('@/views/pages/libros/Online.vue')
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
