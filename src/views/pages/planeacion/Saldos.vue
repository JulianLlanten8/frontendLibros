<template>
    <main class="grid m-1 flex justify-content-center">
        <article class="col-12 card">
            <h4>Ingreso de saldos</h4>
            <Toast />
            <Toolbar class="col-12">
                <template #start>
                    <Dropdown
                        id="tipo"
                        v-model="tipo"
                        :options="tipos"
                        placeholder="Seleccione que tipo de saldo desea ingresar"
                        class="my-3 w-28rem"
                        :showClear="true"
                        @change="validarSemanaChange(null)"
                    />
                </template>
            </Toolbar>
        </article>
        <Card v-if="tipo === 'Saldos bancarios'" class="col-12">
            <template #title>
                <h5 class="text-2xl">Ingresar saldos bancarios</h5>
            </template>

            <template #content>
                <section class="p-fluid col-12">
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="semana">SEMANA</label>
                        <div class="col-12 md:col-7">
                            <Dropdown
                                id="semana"
                                v-model="saldos.semana"
                                :options="semanas"
                                optionLabel="semana"
                                optionValue="semana"
                                :placeholder="saldos.semana ? saldos.semana : 'Seleccione una semana'"
                                class="my-3 w-full"
                                :showClear="true"
                                :loading="cargandoSaldosIniciales"
                                @change="validarSemanaChange('Saldos bancarios')"
                            />
                        </div>
                    </div>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="cafe">CENTROS COMERCIALES DEL CAFÉ SAS</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="cafe"
                                v-model="saldos.cafe"
                                aria-describedby="cafe"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="sur">CENTROS COMERCIALES DEL SUR SAS</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="sur"
                                v-model="saldos.sur"
                                aria-describedby="sur"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="sec"> SERVICIOS ESTRATEGICOS COMPARTIDOS SAS </label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="sec"
                                v-model="saldos.sec"
                                aria-describedby="sec"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="paocali">P.A.O CALI</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="paocali"
                                v-model="saldos.paocali"
                                aria-describedby="pao cali"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="barranquilla">P.A.O BARRANQUILLA</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="barranquilla"
                                v-model="saldos.barranquilla"
                                aria-describedby="pao barranquilla"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="paovillavicencio">P.A.O VILLAVICENCIO</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="paovillavicencio"
                                v-model="saldos.paovillavicencio"
                                aria-describedby="pao villavicencio"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">P.A.O NEIVA</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldos.paoneiva"
                                aria-describedby="pao neiva"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="yumbo">P.A.O YUMBO</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="yumbo"
                                v-model="saldos.paoyumbo"
                                aria-describedby="pao yumbo"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                    <section class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="plataforma">P.A.O PLATAFORMA</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="plataforma"
                                v-model="saldos.plataforma"
                                aria-describedby="plataforma"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </section>
                </section>
            </template>
            <template #footer>
                <article class="px-8">
                    <Button
                        label="Guardar"
                        class="p-button-success w-full"
                        :disabled="validarSemana"
                        :loading="guardandoSaldos"
                        @click="guardarSaldos"
                    />
                </article>
            </template>
        </Card>
        <Card v-if="tipo === 'Saldos anuales'" class="col-12">
            <template #title>
                <h5 class="text-2xl">Ingresar saldo anual</h5>
            </template>

            <template #content>
                <div class="p-fluid col-12">
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">SEMANA INICIAL</label>
                        <div class="col-12 md:col-7">
                            <Dropdown
                                v-model="saldoAnual.semana"
                                :options="semanas"
                                optionLabel="semana"
                                optionValue="semana"
                                placeholder="Seleccione una semana"
                                class="my-3 w-full"
                                :showClear="true"
                                :disabled="true"
                                @change="validarSemanaChange('Saldos anuales')"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="saldoAnualSur">CENTROS COMERCIALES DEL SUR SAS</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="saldoAnualSur"
                                v-model="saldoAnual.sur"
                                aria-describedby="saldoAnualSur"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">CENTROS COMERCIALES DEL CAFÉ SAS</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldoAnual.cafe"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">
                            SERVICIOS ESTRATEGICOS COMPARTIDOS SAS
                        </label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldoAnual.sec"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">P.A.O BARRANQUILLA</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldoAnual.barranquilla"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">P.A.O CALI</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldoAnual.paocali"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">P.A.O YUMBO</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldoAnual.paoyumbo"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">P.A.O VILLAVICENCIO</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="paovillavicencio"
                                v-model="saldoAnual.paovillavicencio"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>

                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">P.A.O PLATAFORMA</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldoAnual.plataforma"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">P.A.O NEIVA</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldoAnual.paoneiva"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <article class="px-8">
                    <Button
                        label="Guardar"
                        :disabled="validarSemana"
                        class="p-button-success w-full"
                        @click="guardarSaldoAnual"
                        @keydown.enter="guardarSaldoAnual"
                    />
                </article>
            </template>
        </Card>
        <Card v-if="tipo === 'Rendimientos Financieros'" class="col-12">
            <template #title>
                <h5 class="text-2xl">Ingresar rendimientos financieros</h5>
            </template>

            <template #content>
                <div class="p-fluid col-12">
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">SEMANA INICIAL</label>
                        <div class="col-12 md:col-7">
                            <Dropdown
                                v-model="saldos.semana"
                                :options="semanas"
                                optionLabel="semana"
                                optionValue="semana"
                                placeholder="Seleccione una semana"
                                class="my-3 w-full"
                                :showClear="true"
                                @change="validarSemanaChange('Rendimientos Financieros')"
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
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
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
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">
                            SERVICIOS ESTRATEGICOS COMPARTIDOS SAS
                        </label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="username"
                                v-model="saldos.sec"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
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
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
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
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
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
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-5" for="username">P.A.O VILLAVICENCIO</label>
                        <div class="col-12 md:col-7">
                            <InputNumber
                                :disabled="validarSemana"
                                id="paovillavicencio"
                                v-model="saldos.paovillavicencio"
                                aria-describedby="username-help"
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
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
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
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
                                mode="currency"
                                currency="COP"
                                :minFractionDigits="0"
                                locale="es-CO"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <article class="px-8">
                    <Button label="Guardar" class="p-button-success w-full" @click="guardarRendimientos" />
                </article>
            </template>
        </Card>
    </main>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { crear, obtenerTodo } from '@/service/clienteHttp';
import { useToast } from 'primevue/usetoast';
onMounted(() => {
    obtenerSemanas('CENTROS COMERCIALES DEL CAFÉ SAS');
});

const toast = useToast();
const semanas = ref(null);
const validarSemana = ref(true);
const cargandoSociedades = ref(null);

const tipo = ref('');
const tipos = ref(['Saldos bancarios', 'Rendimientos Financieros', 'Saldos anuales']);

const saldos = reactive({
    semana: null,
    sur: 0,
    cafe: 0,
    sec: 0,
    plataforma: 0,
    barranquilla: 0,
    paoyumbo: 0,
    paovillavicencio: 0,
    paoneiva: 0,
    paocali: 0
});

const saldoAnual = reactive({
    semana: '',
    sur: 0,
    cafe: 0,
    sec: 0,
    plataforma: 0,
    barranquilla: 0,
    paoyumbo: 0,
    paovillavicencio: 0,
    paoneiva: 0,
    paocali: 0
});

const cargandoSaldosIniciales = ref(false);
const guardandoSaldos = ref(false);

const obtenerSaldos = async (deTipo) => {
    cargandoSaldosIniciales.value = true;
    let semana = saldos.semana.replaceAll('/', '.');
    const tipoSaldo = () => {
        if (deTipo == 'Saldos bancarios') return '/saldos/obtenerSemana/9/';
        if (deTipo == 'Rendimientos Financieros') return 'ejecutado/rendimiento/obtener/';
        if (deTipo == 'Saldos anuales') return 'saldosAnuales';
    };

    //reset saldos
    for (const key in saldos) {
        if (key != 'semana') saldos[key] = 0;
    }
    await obtenerTodo(`${tipoSaldo()}${semana}`)
        .then((res) => {
            for (const saldo of res.data) {
                if (saldo.sociedad == 'CENTROS COMERCIALES DEL SUR SAS') saldos.sur = parseFloat(saldo.valor);
                if (saldo.sociedad == 'CENTROS COMERCIALES DEL CAFÉ SAS') saldos.cafe = parseFloat(saldo.valor);
                if (saldo.sociedad == 'SERVICIOS ESTRAT\u00c9GICOS COMPARTIDOS SAS')
                    saldos.sec = parseFloat(saldo.valor);
                if (saldo.sociedad == 'P.A.O PLATAFORMA') saldos.plataforma = parseFloat(saldo.valor);
                if (saldo.sociedad == 'P.A.O BARRANQUILLA') saldos.barranquilla = parseFloat(saldo.valor);
                if (saldo.sociedad == 'P.A.O YUMBO') saldos.paoyumbo = parseFloat(saldo.valor);
                if (saldo.sociedad == 'P.A.O VILLAVICENCIO') saldos.paovillavicencio = parseFloat(saldo.valor);
                if (saldo.sociedad == 'P.A.O NEIVA') saldos.paoneiva = parseFloat(saldo.valor);
                if (saldo.sociedad == 'P.A.O CALI') saldos.paocali = parseFloat(saldo.valor);
            }
        })
        .catch((err) => {
            toast.add({
                severity: 'danger',
                summary: 'Ups! algo salio mal al obtener los saldos error:',
                detail: `${err}`,
                life: 5000
            });
        })
        .finally(() => {
            cargandoSaldosIniciales.value = false;
        });
};

const obtenerSemanas = async (sociedad) => {
    cargandoSociedades.value = true;
    await obtenerTodo(`/flujoCaja/semanas/${sociedad}`)
        .then((res) => {
            semanas.value = res.data;
        })
        .catch((err) => {
            toast.add({
                severity: 'danger',
                summary: 'Error',
                detail: `Ups! algo salio mal al obtener las sociedades error: ${err}`,
                life: 5000
            });
        })
        .finally(() => {
            cargandoSociedades.value = false;
        });
};

const validarSemanaChange = (deTipo) => {
    if (saldos.semana != null && deTipo) {
        validarSemana.value = false;
        obtenerSaldos(deTipo);
    } else {
        //reset saldos
        for (const key in saldos) {
            if (key != 'semana') saldos[key] = 0;
        }
        validarSemana.value = true;
        toast.add({
            severity: 'info',
            summary: 'Información',
            detail: 'A continuacion seleccionar una semana',
            life: 3000
        });
    }
};

const guardarSaldos = () => {
    guardandoSaldos.value = true;
    crear('esperado/saldos_bancarios', saldos, 'application/json')
        .then((res) => {
            obtenerSaldos('Saldos bancarios');
            toast.add({
                severity: 'success',
                summary: `${res.data.message}`,
                detail: 'Saldos guardados correctamente',
                life: 5000
            });
        })
        .catch((err) => {
            toast.add({
                severity: 'danger',
                summary: 'Error',
                detail: `Ups! algo salio mal al guardar los saldos error: ${err}`,
                closable: true
            });
        })
        .finally(() => {
            guardandoSaldos.value = false;
        });
};

const guardarSaldoAnual = () => {
    crear('esperado/saldo_anual', saldoAnual, 'application/json')
        .then((res) => {
            console.log(res);
            toast.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Saldos guardados correctamente',
                life: 5000
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const guardarRendimientos = () => {
    crear('ejecutado/rendimiento/crear-actualizar', saldos, 'application/json')
        .then((res) => {
            console.log(res);
            obtenerSaldos('Rendimientos Financieros');
            toast.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Rendimientos guardados correctamente',
                life: 5000
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>

<style lang="scss" scoped></style>
