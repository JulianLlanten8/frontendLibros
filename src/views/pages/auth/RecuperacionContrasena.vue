<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
        <div class="flex flex-column align-items-center justify-content-center">
            <div
                style="
                    border-radius: 56px;
                    padding: 0.3rem;
                    background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
                "
            >
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Facturacion y cartera</div>
                        <span class="text-600 font-medium">Restauracion de contraseña</span>
                    </div>

                    <Message v-if="error" :life="5000" :sticky="false" severity="error" class="w-full">
                        {{ error }}
                    </Message>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo Electronico</label>
                        <InputText
                            id="email1"
                            type="text"
                            placeholder="Correo electronico"
                            class="w-full md:w-30rem mb-5"
                            style="padding: 1rem"
                            v-model="restablecer.email"
                        />

                        <label for="password" class="block text-900 text-xl font-medium mb-2">Contraseña</label>
                        <Password
                            id="password"
                            v-model="restablecer.password"
                            placeholder="Contraseña"
                            :toggleMask="true"
                            class="w-full mb-3"
                            inputClass="w-full"
                            inputStyle="padding:1rem"
                        >
                        </Password>

                        <label for="passwordConfirmation" class="block text-900 font-medium text-xl mb-2"
                            >Confirme su contraseña</label
                        >
                        <Password
                            id="password1"
                            v-model="restablecer.password_confirmation"
                            placeholder="Confirmacion de contraseña"
                            :toggleMask="true"
                            class="w-full mb-5"
                            inputClass="w-full"
                            inputStyle="padding:1rem"
                        >
                        </Password>

                        <Button
                            label="Restablecer Contraseña"
                            @click="restablercerContrasena()"
                            class="w-full p-3 text-lg mb-2"
                        >
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { enviarDatos } from '@/service/clienteHttp';
/* import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'; */

const restablecer = reactive({
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const error = ref('');
const route = useRoute();

onMounted(() => {
    restablecer.token = route.query.token;
});

const restablercerContrasena = () => {
    if (restablecer.password != restablecer.password_confirmation) {
        error.value = 'Las contraseñas no coinciden';
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

<style lang="scss" scoped></style>
