<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="
                    border-radius: 56px;
                    padding: 0.3rem;
                    background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
                "
            >
                <form
                    class="w-full surface-card py-8 px-5 sm:px-8"
                    style="border-radius: 53px"
                    @keyup.enter="iniciarSesion(!v$.$invalid)"
                >
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Planeación</div>
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>
                    <div class="col-12">
                        <Message v-if="error" :life="5000" :close="cerro()" :sticky="false" severity="error"
                            >{{ error }}
                        </Message>
                    </div>

                    <div class="field">
                        <div class="m-0 p-0">
                            <label
                                for="email"
                                class="block text-900 text-xl font-medium mb-2"
                                :class="{ 'p-error': (v$.email.$invalid && submitted) || error }"
                            >
                                Correo electrónico
                                <span class="text-red-500">*</span>
                            </label>
                            <InputText
                                id="email"
                                type="text"
                                placeholder="Correo electrónico"
                                class="w-full md:w-30rem"
                                :class="{ 'p-invalid': (v$.email.$invalid && submitted) || error }"
                                style="padding: 1rem"
                                v-model="v$.email.$model"
                            />
                        </div>
                        <span v-if="(v$.email.$error && submitted) || error">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                                <small class="p-error">{{ error.$message }}</small>
                            </span>
                        </span>
                        <small
                            v-else-if="(v$.email.$invalid && submitted) || error || v$.email.$pending.$response"
                            class="p-error"
                        >
                            {{ v$.email.required.$message.replace('Value', 'Email') }}
                        </small>
                    </div>

                    <div class="field">
                        <label
                            for="password"
                            class="block text-900 font-medium text-xl"
                            :class="{ 'p-error': (v$.password.$invalid && submitted) || error }"
                            >Contraseña
                            <span class="text-red-500">*</span>
                        </label>
                        <Password
                            id="password"
                            v-model="v$.password.$model"
                            placeholder="Contraseña"
                            class="w-full"
                            :feedback="false"
                            :class="{ 'p-invalid': (v$.password.$invalid && submitted) || error }"
                            inputClass="w-full"
                            inputStyle="padding:1rem"
                        >
                        </Password>
                        <small v-if="v$.password.$invalid && submitted" class="p-error">
                            <!-- imprime el mensaje generado por -->
                            {{ v$.password.$errors[0].$message }}
                            <!-- {{ v$.password.$invalid && submitted ? 'La contraseña es requerida' : '' }}
                            {{ error? error: '' }} -->
                        </small>
                    </div>

                    <div class="flex align-items-center justify-content-between mb-5 gap-5">
                        <a
                            class="font-medium no-underline ml-2 text-right cursor-pointer"
                            @click="router.push('/olvido-contrasena')"
                            style="color: var(--primary-color)"
                            >Olvido su contraseña?
                        </a>
                    </div>

                    <Button
                        label="Iniciar sesión"
                        class="w-full p-3 text-xl"
                        :class="{ 'p-button-info': !v$.$invalid }"
                        @click="iniciarSesion(!v$.$invalid)"
                        :loading="isLoading"
                        iconPos="right"
                        :disabled="v$.$invalid"
                    >
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
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { enviarDatos, obtenerTodo } from '@/service/clienteHttp';
const { contextPath } = useLayout();
const error = ref('');
const submitted = ref('');
const isLoading = ref(false);
const login = reactive({
    email: ref(''),
    password: ref('')
});
const cerro = async () => {
    setTimeout(() => {
        error.value = '';
    }, 3000);
};
const iniciarSesion = async (isFormValid) => {
    if (!isFormValid) {
        submitted.value = true;
        return;
    }
    isLoading.value = true;
    return await enviarDatos('auth/login', login)
        .then((res) => {
            if (res?.access_token) {
                sessionStorage.setItem('token', res.access_token);
                sessionStorage.setItem('token_type', res.token_type);
                obtenerDatosUsuario();
                router.push('/reportes/semanales');
            }
            if (res?.status === 401) {
                error.value = res.data.message;
            }
        })
        .catch((err) => {
            throw new Error(err);
        })
        .finally(() => {
            isLoading.value = false;
        });
};

const obtenerDatosUsuario = async () => {
    if (sessionStorage.getItem('token')) {
        await obtenerTodo('usuario/obtenerDatosUsuario').then((response) => {
            sessionStorage.setItem('USER', JSON.stringify(response.user));
            return response;
        });
    }
};

const rules = {
    email: { required, email },
    password: { required }
};
const v$ = useVuelidate(rules, login);

const logoUrl = computed(() => {
    return `${contextPath}layout/images/LOGOUNICO.webp`;
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
