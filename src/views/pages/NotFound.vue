<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen max-w-20rem overflow-hidden"
    >
        <div class="flex flex-column align-items-center justify-content-center">
            <div
                style="
                    border-radius: 56px;
                    padding: 0.3rem;
                    background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);
                "
            >
                <div
                    class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                    style="border-radius: 53px"
                >
                    <span class="text-blue-500 font-bold text-8xl">404</span>
                    <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">Pagina no encontrada</h1>
                    <p class="text-600">El recurso solicitado no está disponible.</p>
                    <router-link to="/" class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                        <span
                            class="flex justify-content-center align-items-center bg-cyan-400 border-round"
                            style="height: 3.5rem; width: 3.5rem"
                        >
                            <i class="text-50 pi pi-fw pi-table text-2xl"></i>
                        </span>
                        <span class="ml-4 flex flex-column flex-wrap">
                            <span class="text-900 lg:text-xl font-medium mb-0 block"> Inicio del aplicativo </span>
                            <span class="text-600 lg:text-xl"> Te redireccionaremos donde deberias estar 😊. </span>
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<script setup>
import AppConfig from '@/layout/AppConfig.vue';
</script>
