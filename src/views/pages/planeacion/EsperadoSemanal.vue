<template>
    <div class="grid">
        <div class="col-6">
            <Card>
                <template #title>
                    <h5>Ingresar saldos bancarios</h5>
                </template>

                <template #content>
                    <div class="p-fluid col-12">
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">SEMANA</label>
                            <div class="col-12 md:col-7">
                                <Dropdown
                                    v-model="saldos.semana"
                                    :options="semanas"
                                    optionLabel="semana"
                                    optionValue="semana"
                                    placeholder="Seleccione una semana"
                                    class="my-3 w-full"
                                    :showClear="true"
                                    @change="validarSemanaChange()"
                                />
                            </div>
                        </div>
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">CENTROS COMERCIALES DEL SUR SAS</label>
                            <div class="col-12 md:col-7">
                                <InputNumber
                                    :disabled="validarSemana"
                                    id="username"
                                    v-model="saldos.sur"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">CENTROS COMERCIALES DEL CAFÉ SAS</label>
                            <div class="col-12 md:col-7">
                                <InputNumber
                                    :disabled="validarSemana"
                                    id="username"
                                    v-model="saldos.cafe"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">P.A.O PLATAFORMA</label>
                            <div class="col-12 md:col-7">
                                <InputNumber
                                    :disabled="validarSemana"
                                    id="username"
                                    v-model="saldos.plataforma"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">P.A.O BARRANQUILLA</label>
                            <div class="col-12 md:col-7">
                                <InputNumber
                                    :disabled="validarSemana"
                                    id="username"
                                    v-model="saldos.barranquilla"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">P.A.O YUMBO</label>
                            <div class="col-12 md:col-7">
                                <InputNumber
                                    :disabled="validarSemana"
                                    id="username"
                                    v-model="saldos.paoyumbo"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">P.A.O VILLAVICENCIO</label>
                            <div class="col-12 md:col-7">
                                <InputNumber
                                    :disabled="validarSemana"
                                    id="username"
                                    v-model="saldos.paovillavicencio"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">P.A.O NEIVA</label>
                            <div class="col-12 md:col-7">
                                <InputNumber
                                    :disabled="validarSemana"
                                    id="username"
                                    v-model="saldos.paoneiva"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                        <div class="field grid">
                            <label class="col-12 mb-2 md:col-5" for="username">P.A.O CALI</label>
                            <div class="col-12 md:col-7">
                                <InputNumber
                                    :disabled="validarSemana"
                                    id="username"
                                    v-model="saldos.paocali"
                                    aria-describedby="username-help"
                                />
                            </div>
                        </div>
                    </div>
                </template>
                <template #footer>
                    <Button
                        label="Guardar"
                        :disabled="validarSemana"
                        class="p-button-success text-center"
                        @click="guardarSaldos"
                    />
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { crear, obtenerTodo } from '@/service/clienteHttp';
onMounted(() => {
    obtenerSemanas('CENTROS COMERCIALES DEL CAFÉ SAS');
});

const semanas = ref(null);
const validarSemana = ref(true);
const cargandoSociedades = ref(null);

const saldos = reactive({
    semana: null,
    sur: 0,
    cafe: 0,
    plataforma: 0,
    barranquilla: 0,
    paoyumbo: 0,
    paovillavicencio: 0,
    paoneiva: 0,
    paocali: 0
});

const obtenerSemanas = async (sociedad) => {
    cargandoSociedades.value = true;
    await obtenerTodo(`/flujoCaja/semanas/${sociedad}`)
        .then((res) => {
            semanas.value = res.data;
        })
        .catch((err) => {
            console.log(err);
            /* toast.add({
                severity: 'danger',
                summary: 'Error',
                detail: `Ups! algo salio mal al obtener las sociedades error: ${err}`,
                life: 5000
            }); */
        })
        .finally(() => {
            cargandoSociedades.value = false;
        });
};

const validarSemanaChange = () => {
    if (saldos.semana != null) {
        validarSemana.value = false;
    } else {
        validarSemana.value = true;
    }
};

const guardarSaldos = () => {
    crear('esperado/saldos_bancarios', saldos, 'application/json')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>

<style lang="scss" scoped></style>
