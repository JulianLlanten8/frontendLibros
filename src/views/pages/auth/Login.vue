<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Facturacion y cartera</div>
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>
                    <div class="col-12">
                        <Message v-if="error" :life="5000" :sticky="false" severity="error">{{ error }}</Message>
                    </div>
                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo Electronico</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="email" />
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">Olvido su Contraseña?
                            </a>
                        </div>
                        <Button label="Iniciar Sesión" class="w-full p-3 text-xl" @click="iniciarSesion()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>
<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import router from '@/router';

import { enviarDatos } from '@/service/clienteHttp';

const { layoutConfig, contextPath } = useLayout();
const email = ref('');
const password = ref('');
const error = ref('');

const iniciarSesion = async () => {
    const login = {
        email: email.value,
        password: password.value,
    };
    return await enviarDatos('auth/login', login).then((res) => {
        if (res?.access_token) {
            sessionStorage.setItem('token', res.access_token);
            sessionStorage.setItem('token_type', res.token_type);
            router.push('/inicio/dashboard');
        }
        if (res?.status === 401) {
            error.value = res.data.message;
        }
    }).catch((err) => {
        throw new Error(err);
    });
};

const logoUrl = computed(() => {
    return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
