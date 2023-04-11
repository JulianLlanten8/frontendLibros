<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen max-w-20rem overflow-hidden"
    >
        <div class="flex flex-column align-items-center justify-content-center">
            <img src="/layout/images/LOGOUNICO.webp" alt="Sakai logo" class="w-5rem flex-shrink-0" />
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
                    <span class="text-blue-500 font-bold text-4xl">404</span>
                    <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">Pagina no encontrada</h1>
                    <p class="text-600">El recurso solicitado no está disponible.</p>
                    <router-link
                        to="/reportes/semanales"
                        class="w-full flex align-items-center py-5 border-300 border-bottom-1"
                    >
                        <span
                            class="flex justify-content-center align-items-center bg-cyan-400 border-round"
                            style="height: 3.5rem; width: 3.5rem"
                        >
                            <i class="text-50 pi pi-fw pi-table text-2xl"></i>
                        </span>
                        <span class="ml-4 flex flex-column flex-wrap">
                            <span class="text-900 lg:text-xl font-medium mb-0 block"> Preguntas frecuentes </span>
                            <span class="text-600 lg:text-xl">
                                Algunas preguntas frecuentes sobre el uso de la plataforma.
                            </span>
                        </span>
                    </router-link>
                    <a
                        href="https://ccunico.helppeoplecloud.com/container/"
                        class="w-full flex align-items-center py-5 border-300 border-bottom-1"
                    >
                        <span
                            class="flex justify-content-center align-items-center bg-orange-400 border-round"
                            style="height: 3.5rem; width: 3.5rem"
                        >
                            <i class="pi pi-fw pi-question-circle text-50 text-2xl"></i>
                        </span>
                        <span class="ml-4 flex flex-column">
                            <p class="text-900 lg:text-xl font-medium mb-0">Centro de soluciones</p>
                            <p class="text-600 lg:text-xl">Comunique un problema o solicite ayuda.</p>
                        </span>
                    </a>
                    <router-link to="/" class="w-full flex align-items-center mb-5 py-5 border-300 border-bottom-1">
                        <span
                            class="flex justify-content-center align-items-center bg-indigo-400 border-round"
                            style="height: 3.5rem; width: 3.5rem"
                        >
                            <i class="pi pi-fw pi-unlock text-50 text-2xl"></i>
                        </span>
                        <span class="ml-4 flex flex-column">
                            <p class="text-900 lg:text-xl font-medium mb-0">Gestión de permisos</p>
                            <p class="text-600 lg:text-xl">
                                Configure los permisos de acceso a los recursos de la plataforma.
                            </p>
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
