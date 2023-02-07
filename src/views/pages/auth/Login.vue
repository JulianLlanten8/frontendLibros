<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <form @submit.prevent="iniciarSesion(!v$.$invalid)" class="w-full surface-card py-8 px-5 sm:px-8"
                    style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Facturacion y cartera</div>
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>
                    <div class="col-12">
                        <Message v-if="error" :life="5000" :sticky="false" severity="error">{{ error }}</Message>
                    </div>


                    <div class="field">
                        <div class="m-0 p-0">
                            <label for="email" class="block text-900 text-xl font-medium mb-2"
                                :class="{ 'p-error': v$.email.$invalid && submitted }">Correo Electronico
                                <span class="text-red-500">*</span></label>
                            <InputText id="email" type="text" placeholder="Correo electronico" class="w-full md:w-30rem"
                                :class="{ 'p-invalid': v$.email.$invalid && submitted }" style="padding: 1rem"
                                v-model="v$.email.$model" />
                        </div>
                        <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                                <small class="p-error">{{ error.$message }}</small>
                            </span>
                        </span>
                        <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                            class="p-error"> El correo electronico es requerido
                        </small>
                    </div>

                    <div class="field">
                        <label for="password" class="block text-900 font-medium text-xl mb-2"
                            :class="{ 'p-error': v$.password.$invalid && submitted }">Contraseña
                            <span class="text-red-500">*</span>
                        </label>
                        <Password id="password" v-model="v$.password.$model" placeholder="Contraseña" :toggleMask="true"
                            class="w-full" :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                            inputClass="w-full" inputStyle="padding:1rem">
                        </Password>
                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
                            class="p-error">La contraseña es requerida</small>
                    </div>

                    <div class="flex align-items-center justify-content-between  gap-5 mb-2">
                        <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                            style="color: var(--primary-color)">Olvido su Contraseña?
                        </a>
                    </div>

                    <Button label="Iniciar Sesión" class="w-full p-3 text-xl "
                        :class="{ 'p-button-info': !v$.$invalid }" @click="iniciarSesion(!v$.$invalid)">
                    </Button>
                </form>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>
<script setup>
import { useLayout } from '@/layout/composables/layout';
import { reactive, ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import router from '@/router';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import { enviarDatos } from '@/service/clienteHttp';

const { layoutConfig, contextPath } = useLayout();
const error = ref('');
const submitted = ref('');

const login = reactive({
    email: ref(""),
    password: ref(""),
});

const iniciarSesion = async (isFormValid) => {
    console.log("enviando ...")
    if (!isFormValid) {
        submitted.value = true;
        return;
    }
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
const rules = {
    email: { required, email },
    password: { required },
};
const v$ = useVuelidate(rules, login);

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
