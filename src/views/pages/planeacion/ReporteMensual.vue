<template>
    <main>
        <DataTable id="tablaFlujos" :value="flujoMensual" :loading="cargandoTabla">
            <template #header>
                <h3>Flujo de caja mensual</h3>
                <Toolbar>
                    <template #start>
                        <div class="p-d-flex p-jc-center mr-2">
                            <Dropdown
                                class="p-mr-2"
                                v-model="sociedadSeleccionada"
                                :options="sociedades"
                                optionLabel="nombre"
                                optionValue="nombre"
                                :editable="true"
                                :loading="cargandoSociedades"
                                placeholder="Selecione una sociedad"
                                @change="filtroSociedades(sociedadSeleccionada)"
                            />
                        </div>
                        <div class="p-d-flex p-jc-center">
                            <Dropdown
                                v-model="semana"
                                :options="semanas"
                                :loading="cargandoSemanas"
                                emptyMessage="No hay semanas disponibles"
                                optionLabel="semana"
                                optionValue="semana"
                                placeholder="Seleccione una semana"
                                class="my-3 w-full"
                                :showClear="true"
                                @change="ObtenerFlujos(sociedadSeleccionada, semana)"
                            />
                        </div>
                    </template>
                    <!-- <template #end>
                    </template> -->
                </Toolbar>
                <div class="flex justify-content-between flex-wrap">
                    <cardEstadistica v-if="flujoNeto.concepto" :estadistica="flujoNeto" />
                    <cardEstadistica v-if="saldoFinal.concepto" :estadistica="saldoFinal" />
                    <cardEstadistica v-if="saldoBancarios.concepto" :estadistica="saldoBancarios" />
                </div>
            </template>
            <template #empty><p class="text-center">Seleccione una sociedad.</p> </template>
            <template #loading> <h3 class="text-white my-10">Cargando flujos, Por favor espere ...</h3> </template>
            <Column field="concepto" header="Concepto">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto.length)">
                        {{ slotProps.data.concepto }}
                    </span>
                </template>
            </Column>
            <Column field="descripcion" header="Descripción">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto.length)">
                        {{ slotProps.data.descripcion }}
                    </span>
                </template>
            </Column>
            <Column field="ejecucion" header="Ejecución" class="text-right" headerStyle="text-right">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto.length)">
                        {{ $formatoMonedaCOP(slotProps.data.ejecutado) }}
                    </span>
                </template>
            </Column>
            <Column field="esperado" header="Esperado" class="text-right">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto.length)">
                        {{ $formatoMonedaCOP(slotProps.data.esperado) }}
                    </span>
                </template>
            </Column>
            <Column field="porcentaje" header="Cumplimiento">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto.length)">
                        {{
                            slotProps.data.esperado == 0 ||
                            slotProps.data.ejecutado == 0 ||
                            slotProps.data.esperado == '0' ||
                            slotProps.data.ejecutado == '0'
                                ? 0
                                : Math.round((slotProps.data.ejecutado / slotProps.data.esperado) * 100)
                        }}%
                    </span>
                </template>
            </Column>
            <template #footer>
                <div class="text-center p-d-flex p-jc-between">
                    <Button
                        v-if="flujoMensual.length > 0"
                        label="Imprimir"
                        icon="pi pi-print"
                        class="p-button-success p-mr-2"
                        @click="imprimir(flujoMensual)"
                    />
                </div>
            </template>
        </DataTable>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { obtenerTodo, crear } from '@/service/clienteHttp';
import { useToast } from 'primevue/usetoast';
import * as XLSX from 'xlsx/xlsx.mjs';

import cardEstadistica from '@/components/cardEstadisticaSemanal.vue';

const toast = useToast();
const sociedadSeleccionada = ref(null);

const semana = ref(null);

const sociedades = ref([]);

const semanas = ref([]);

const flujoMensual = ref([]);

const cargandoSociedades = ref(false);

const cargandoSemanas = ref(false);

const cargandoTabla = ref(false);

const flujoNeto = ref({});

const saldoFinal = ref({});
const saldoBancarios = ref({});

onMounted(() => {
    obtenerSociedades();
});

const claseTituloSubtitulo = (concepto) => {
    if (concepto <= 2) {
        return 'font-bold';
    } else {
        return 'ml-3';
    }
};

const ObtenerFlujos = (sociedad, fecha) => {
    if (sociedad && fecha) {
        cargandoTabla.value = true;
        crear('esperado/esperadosemanal', { sociedad: sociedad, fecha: fecha }, 'application/json')
            .then((res) => {
                flujoMensual.value = res.data.data;
                for (const fs in flujoMensual.value) {
                    if (flujoMensual.value[fs].concepto == '7') {
                        flujoNeto.value = flujoMensual.value[fs];
                    }
                    if (flujoMensual.value[fs].concepto == '8') {
                        saldoFinal.value = flujoMensual.value[fs];
                    }
                    if (flujoMensual.value[fs].concepto == '9') {
                        saldoBancarios.value = flujoMensual.value[fs];
                    }
                }
            })
            .catch((err) => {
                toast.add({
                    severity: 'danger',
                    summary: 'Ups! algo salio mal al obtener los flujos de caja error:',
                    detail: `${err}`,
                    closable: true
                });
                if (flujoMensual.value) {
                    flujoMensual.value = [];
                }
            })
            .finally(() => {
                cargandoTabla.value = false;
            });
    } else {
        toast.add({
            severity: 'info',
            summary: 'Fecha',
            detail: 'Por favor, renueve una fecha',
            life: 3000
        });
    }
};

const obtenerSemanas = async (sociedad) => {
    cargandoSemanas.value = true;
    await obtenerTodo(`/flujoCaja/semanas/${sociedad}`)
        .then((res) => {
            semanas.value = res.data;
        })
        .catch((err) => {
            toast.add({
                severity: 'danger',
                summary: 'Ups! algo salio mal al obtener las sociedades error: ',
                detail: `${err}`,
                life: 5000
            });
        })
        .finally(() => {
            cargandoSemanas.value = false;
        });
};

const filtroSociedades = (sociedad) => {
    if (semanas.value.length > 0) {
        ObtenerFlujos(sociedadSeleccionada.value, semana.value.name);
    } else {
        obtenerSemanas(sociedad);
    }
};

const obtenerSociedades = () => {
    cargandoSociedades.value = true;
    obtenerTodo('sociedad/obtenerTodo')
        .then((res) => {
            sociedades.value = res.data;
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

const imprimir = async (flujoSemanal) => {
    const wb = XLSX.utils.book_new();
    const nombreArchivo = `FLUJO DE SEMANA ${sociedadSeleccionada.value} ${semana.value}`;

    //Elimina sociedad y semana de los flujoSemanal
    flujoSemanal.forEach((flujo) => {
        delete flujo.sociedad;
        delete flujo.semana;
    });
    const ws = XLSX.utils.json_to_sheet(flujoSemanal);

    // eslint-disable-next-line no-unused-vars
    ws['!cols'] = flujoSemanal.map((x) => ({ wpx: 200 }));

    const nombreHoja = semana.value.replace(/\//g, '-');
    XLSX.utils.book_append_sheet(wb, ws, nombreHoja);

    XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
};
</script>

<style lang="scss" scoped>
//
</style>
