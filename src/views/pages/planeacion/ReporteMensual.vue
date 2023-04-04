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
                                @change="ObtenerFlujosMensuales()"
                            />
                        </div>
                        <div class="p-d-flex p-jc-center mr-2">
                            <Calendar
                                class="w-full"
                                v-model="mes"
                                view="month"
                                dateFormat="mm/yy"
                                placeholder="mm/yy"
                                :showIcon="true"
                                :showButtonBar="true"
                                :monthNavigator="true"
                                :yearNavigator="true"
                                @update:modelValue="ObtenerFlujosMensuales()"
                            />
                        </div>
                    </template>
                    <template #end>
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
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto)">
                        {{ slotProps.data.concepto }}
                    </span>
                </template>
            </Column>
            <Column field="descripcion" header="Descripción">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto)">
                        {{ slotProps.data.descripcion }}
                    </span>
                </template>
            </Column>
            <Column field="ejecucion" header="Ejecución" class="text-right" headerStyle="text-right">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto)">
                        {{ $formatoMonedaCOP(slotProps.data.ejecutado) }}
                    </span>
                </template>
            </Column>
            <Column field="esperado" header="Esperado" class="text-right">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto)">
                        {{ $formatoMonedaCOP(slotProps.data.esperado) }}
                    </span>
                </template>
            </Column>
            <Column field="porcentaje" header="Cumplimiento">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto)">
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
            <template #footer></template>
        </DataTable>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { obtenerTodo /* crear */ } from '@/service/clienteHttp';
import { useToast } from 'primevue/usetoast';
import * as XLSX from 'xlsx/xlsx.mjs';

import cardEstadistica from '@/components/CardEstadisticaSemanal.vue';

const toast = useToast();
const sociedadSeleccionada = ref(null);

const mes = ref(null);

const sociedades = ref([]);

const flujoMensual = ref([]);

const cargandoSociedades = ref(false);

const cargandoTabla = ref(false);

const flujoNeto = ref({});

const saldoFinal = ref({});
const saldoBancarios = ref({});

onMounted(() => {
    obtenerSociedades();
});

const claseTituloSubtitulo = (concepto) => {
    if (typeof concepto === 'string' && concepto.length <= 2) {
        return 'font-bold';
    } else {
        return 'ml-3';
    }
};

const ObtenerFlujosMensuales = () => {
    if (!sociedadSeleccionada.value || !mes.value) {
        return;
    }

    cargandoTabla.value = true;
    obtenerTodo(`esperado/mensual/${mes.value.getFullYear()}/${mes.value.getMonth() + 1}/${sociedadSeleccionada.value}`)
        .then((res) => {
            flujoMensual.value = res.data;
            flujoMensual.value.pop();
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
    const nombreArchivo = `FLUJO DE SEMANA ${sociedadSeleccionada.value} ${mes.value}`;

    //Elimina sociedad y semana de los flujoSemanal
    flujoSemanal.forEach((flujo) => {
        delete flujo.sociedad;
        delete flujo.semana;
    });
    const ws = XLSX.utils.json_to_sheet(flujoSemanal);

    // eslint-disable-next-line no-unused-vars
    ws['!cols'] = flujoSemanal.map((x) => ({ wpx: 200 }));

    const nombreHoja = mes.value.replace(/\//g, '-');
    XLSX.utils.book_append_sheet(wb, ws, nombreHoja);

    XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
};
</script>

<style lang="scss" scoped>
//
</style>
