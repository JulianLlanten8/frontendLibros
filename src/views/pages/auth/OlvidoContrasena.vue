<template>
    <article
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
        <section class="flex justify-content-center align-items-center bg-bluegray-100">
            <BlockUI :blocked="cargando" :fullScreen="true"></BlockUI>
            <Card class="card-container">
                <template #title>
                    <h3>Introduce tu dirección de correo electrónico</h3>
                </template>
                <template #subtitle>
                    <span
                        >Acontinuacion se enviara un correo electronico con las instrucciones para restablecer tu
                        contraseña
                    </span>
                </template>
                <template #content>
                    <section class="field">
                        <label
                            for="correoElectronico"
                            class="p-float-label"
                            :class="{ 'p-error': v$.correo.$invalid && submitted }"
                        >
                            Direccion de correo electronico
                        </label>
                        <span class="w-full p-input-icon-right">
                            <InputText
                                type="text"
                                class="w-full"
                                placeholder="pepitoperez@unico.com.co"
                                v-model="v$.correo.$model"
                                autofocus
                                :class="{ 'p-invalid': v$.correo.$invalid && submitted }"
                            />
                            <i class="pi pi-envelope" />
                        </span>
                        <span v-if="v$.correo.$invalid && submitted">
                            <span id="email-error" v-for="(error, index) of v$.correo.$errors" :key="index">
                                <small class="p-error">{{ error.$message }}</small>
                            </span>
                        </span>
                    </section>
                    <InlineMessage v-if="estado && mensaje" :severity="estado" class="w-full"
                        >{{ mensaje }}
                    </InlineMessage>
                </template>
                <template #footer>
                    <div class="align-items-center">
                        <Button
                            :label="labelEnviar"
                            iconPos="right"
                            icon="pi pi-send"
                            class="w-full text-lg"
                            :loading="cargando"
                            @click="enviarCorreoElectronico(!v$.$invalid)"
                        />
                    </div>
                </template>
            </Card>
        </section>
    </article>
</template>

<script setup>
import { ref } from 'vue';
import { enviarDatos } from '@/service/clienteHttp';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';

const correo = ref('');
const estado = ref('');
const mensaje = ref('');
const submitted = ref(false);
const cargando = ref(false);
const labelEnviar = ref('Enviar');

const reglas = {
    correo: {
        required,
        email
    }
};

const v$ = useVuelidate(reglas, { correo });
const enviarCorreoElectronico = (isFormValid) => {
    submitted.value = true;
    if (!isFormValid) {
        return;
    }

    cargando.value = true;
    enviarDatos('auth/password/email', { email: correo.value })
        .then((response) => {
            mensaje.value = response.message;
            estado.value = 'success';
            labelEnviar.value = 'Reenviar';
        })
        .catch((error) => {
            estado.value = 'error';
            mensaje.value = error.message;
        })
        .finally(() => {
            cargando.value = false;
        });
};
</script>

<style lang="scss" scoped></style>
3
