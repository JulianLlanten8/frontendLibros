<template>
    <div class="surface-ground flex flex-column align-items-center justify-content-center min-h-screen">
        <div
            style="
                border-radius: 56px;
                padding: 0.3rem;
                background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
                width: 30rem;
            "
        >
            <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                <div class="text-center mb-5">
                    <div class="text-900 text-3xl font-medium mb-3">Planeación</div>
                    <span class="text-600 font-medium">Restauracion de contraseña</span>
                </div>

                <Message v-if="error" :life="5000" :sticky="false" severity="error" class="w-full">
                    {{ error }}
                </Message>

                <div class="field">
                    <label for="email" class="block text-900 text-xl font-medium mb-2">Correo Electronico</label>
                    <InputText
                        id="email"
                        type="text"
                        placeholder="Correo electronico"
                        class="w-full"
                        style="padding: 1rem"
                        v-model="restablecer.email"
                        :class="{ 'p-invalid': v$.email.$invalid }"
                    />
                    <small v-if="v$.email.$invalid" class="text-red-500 text-xs">
                        <span v-if="v$.email.email.$message">
                            {{ v$.email.email.$message }}
                        </span>
                    </small>
                </div>
                <div class="field">
                    <label
                        for="password"
                        class="block text-900 text-xl font-medium"
                        :class="{ 'p-error font-semibold': v$.password.$invalid }"
                    >
                        Contraseña
                    </label>
                    <Password
                        id="password"
                        v-model="restablecer.password"
                        placeholder="Contraseña"
                        :toggleMask="true"
                        class="w-full"
                        inputClass="w-full"
                        inputStyle="padding:1rem"
                        :class="{ 'p-invalid': v$.password.$invalid }"
                    >
                    </Password>
                </div>
                <div class="field mb-5">
                    <label for="passwordConfirmation" class="block text-900 font-medium text-xl"
                        >Confirme su contraseña</label
                    >
                    <Password
                        id="password1"
                        v-model="restablecer.password_confirmation"
                        placeholder="Confirmacion de contraseña"
                        :toggleMask="true"
                        class="w-full"
                        inputClass="w-full"
                        inputStyle="padding:1rem"
                        :class="{
                            'p-invalid':
                                v$.password_confirmation.$invalid &&
                                noEnviar &&
                                v$.password_confirmation.sameAsPassword.$message
                        }"
                    >
                    </Password>
                    <small v-if="v$.password_confirmation.$invalid" class="text-red-500 text-sm">
                        <span v-if="v$.password_confirmation.sameAsPassword.$message">
                            {{ v$.password_confirmation.sameAsPassword.$message }}
                        </span>
                    </small>
                </div>
                <div class="field">
                    <Button
                        label="Restablecer Contraseña"
                        @click="restablercerContrasena(!v$.$invalid)"
                        class="w-full p-3 text-lg font-medium text-white bg-primary-color hover:bg-primary-color-dark rounded-md shadow-md"
                    >
                    </Button>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { enviarDatos } from '@/service/clienteHttp';
import { email, required, sameAs, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const reglas = computed(() => {
    return {
        email: {
            required: helpers.withMessage('El email es requerido', required),
            email: helpers.withMessage('El valor no es una dirección de correo electrónico válida', email)
        },
        password: { required: helpers.withMessage('La contraseña es requerida', required) },
        password_confirmation: {
            sameAsPassword: helpers.withMessage('Las contraseñas no coinciden', sameAs(restablecer.password))
        }
    };
});

const restablecer = reactive({
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const v$ = useVuelidate(reglas, restablecer);

const error = ref('');
const route = useRoute();
const noEnviar = ref(false);

onMounted(() => {
    restablecer.token = route.query.token;
});

const restablercerContrasena = async (isFormValid) => {
    if (!isFormValid) {
        noEnviar.value = true;
        return;
    }

    enviarDatos('auth/password/reset', {
        token: restablecer.token,
        email: restablecer.email,
        password: restablecer.password,
        password_confirmation: restablecer.password_confirmation
    })
        .then((res) => {
            if (res.status == 'success') {
                router.push('/');
            } else {
                error.value = res.data.message;
            }
        })
        .catch((err) => {
            error.value = err;
            throw new Error(err);
        });
};
</script>

<style lang="scss" scoped>
.p-component-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
