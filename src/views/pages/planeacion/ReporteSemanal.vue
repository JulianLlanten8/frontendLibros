<template>
    <main>
        <DataTable :value="flujos" :loading="cargandoTabla">
            <template #header>
                <h3>Flujo de caja semanal :</h3>
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
                                optionLabel="semana"
                                optionValue="semana"
                                placeholder="Seleccione una semana"
                                class="my-3 w-full"
                                :showClear="true"
                                @change="ObtenerFlujos(sociedadSeleccionada, semana)"
                            />
                        </div>
                    </template>
                </Toolbar>
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
            <Column field="ejecucion" header="Ejecución" class="text-right">
                <template #body="slotProps">
                    <span :class="claseTituloSubtitulo(slotProps.data.concepto.length)">
                        {{ $formatoMonedaCOP(slotProps.data.ejecutado * -1) }}
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
                            slotProps.data.esperado == 0
                                ? 0
                                : Math.round(slotProps.data.ejecutado / slotProps.data.esperado) * 100
                        }}%
                    </span>
                </template>
            </Column>
            <template #footer>
                <div class="text-center p-d-flex p-jc-between">
                    <Button label="Imprimir" icon="pi pi-print" class="p-button-success p-mr-2" @click="imprimir" />
                </div>
            </template>
        </DataTable>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { obtenerTodo, crear } from '@/service/clienteHttp';

const sociedadSeleccionada = ref(null);

const semana = ref(null);

const sociedades = ref([]);

const semanas = ref([]);

const flujos = ref([]);

const cargandoSociedades = ref(false);

const cargandoSemanas = ref(false);

const cargandoTabla = ref(false);

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
    cargandoTabla.value = true;
    crear('esperado/esperadosemanal', { sociedad: sociedad, fecha: fecha }, 'application/json')
        .then((res) => {
            console.log(res);
            flujos.value = res.data.data;
        })
        .catch((err) => {
            console.log(err);
            if (flujos.value) {
                flujos.value = [];
            }
        })
        .finally(() => {
            cargandoTabla.value = false;
        });
};

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
            console.log(err);
        })
        .finally(() => {
            cargandoSociedades.value = false;
        });
};

const imprimir = async () => {
    const res = await obtenerTodo('archivos/descargar', 'blob');
    const url = URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel' }));

    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'flujos.xlsx');
    document.body.appendChild(link);
    link.click();
};

/* const nodes = ref([
    {
        key: '0',
        data: {
            concepto: '0',
            descripcion: 'Saldo Inicial',
            ejecucion: 2763672789,
            esperado: 2763672789,
            cumplimiento: 80
        }
    },
    {
        key: '1',
        data: {
            concepto: '1',
            descripcion: 'Actividad de operacion',
            ejecucion: 340583856,
            esperado: 420368907,
            cumplimiento: -81
        },
        children: [
            {
                key: '1-0',
                data: {
                    concepto: 1,
                    descripcion: 'Ingresos',
                    ejecucion: 340583856,
                    esperado: 420368907,
                    cumplimiento: 81
                },
                children: [
                    {
                        key: '1-0-0',
                        data: {
                            concepto: 1,
                            descripcion: 'Recaudos Fee Pao',
                            ejecucion: 240532926,
                            esperado: 241000000,
                            cumplimiento: 100
                        }
                    },
                    {
                        key: '1-0-0',
                        data: {
                            concepto: 1,
                            descripcion: 'OTROS RECAUDOS',
                            ejecucion: 520348294,
                            esperado: '-',
                            cumplimiento: 100
                        }
                    }
                ]
            },
            {
                key: '0-1',
                data: {
                    concepto: 1,
                    descripcion: 'Egresos',
                    ejecucion: 0,
                    esperado: 3004118053,
                    cumplimiento: 80
                },
                children: [
                    {
                        key: '0-1-0',
                        data: {
                            concepto: 1,
                            descripcion: 'PAGO DE NOMINA',
                            ejecucion: 1727272090,
                            esperado: 2004118053,
                            cumplimiento: 86
                        }
                    },
                    {
                        key: '0-1-1',
                        data: {
                            concepto: 1,
                            descripcion: 'PAGO DE HONORARIOS',
                            ejecucion: 3500000,
                            esperado: 1004118053,
                            cumplimiento: 80
                        }
                    },
                    {
                        key: '0-1-2',
                        data: {
                            concepto: 1,
                            descripcion: 'PAGO DE IMPUESTOS',
                            ejecucion: '-',
                            esperado: 10418944,
                            cumplimiento: 0
                        }
                    }
                ]
            }
        ]
    },
    {
        key: '02',
        data: {
            concepto: '02',
            descripcion: 'Actividad de inversion',
            ejecucion: -220.15,
            esperado: -30072080,
            cumplimiento: 1
        },
        children: [
            {
                key: '4-0',
                data: {
                    concepto: 1,
                    descripcion: 'Egresos',
                    ejecucion: 2121060577,
                    esperado: 2449891985,
                    cumplimiento: 87
                },
                children: [
                    {
                        key: '4-0-0',
                        data: {
                            concepto: 1,
                            descripcion: 'CAPEX TI (LICENCIAS)',
                            ejecucion: '-',
                            esperado: 30072080,
                            cumplimiento: 0
                        }
                    },
                    {
                        key: '4-0-1',
                        data: {
                            concepto: 1,
                            descripcion: 'CAPEX RECOBRO',
                            ejecucion: 220150,
                            esperado: '-',
                            cumplimiento: 0
                        }
                    }
                ]
            }
        ]
    },
    {
        key: '03',
        data: {
            concepto: '03',
            descripcion: 'Actividad de financiacion',
            ejecucion: 340583856,
            esperado: 420368907,
            cumplimiento: -81
        },
        children: [
            {
                key: '3-0',
                data: { concepto: 1, descripcion: 'Ingresos', ejecucion: 2340000, esperado: '-', cumplimiento: 80 },
                children: [
                    {
                        key: '3-0-0',
                        data: {
                            concepto: 1,
                            descripcion: 'PRESTAMOS DE PARTICULARES RECIBIDOS',
                            ejecucion: '-',
                            esperado: '-',
                            cumplimiento: 0
                        }
                    }
                ]
            },
            {
                key: '3-0-0',
                data: {
                    concepto: 1,
                    descripcion: 'Egresos',
                    ejecucion: '-',
                    esperado: 10418944,
                    cumplimiento: 80
                },
                children: [
                    {
                        key: '3-1-0',
                        data: {
                            concepto: 1,
                            descripcion: 'PAGO DE INTERESES',
                            ejecucion: '-',
                            esperado: '-',
                            cumplimiento: 0
                        }
                    },
                    {
                        key: '3-1-0',
                        data: {
                            concepto: 1,
                            descripcion: 'PAGO DE COMISIONES',
                            ejecucion: 41894,
                            esperado: 10418944,
                            cumplimiento: 80
                        }
                    },
                    {
                        key: '3-1-0',
                        data: {
                            concepto: 1,
                            descripcion: 'PAGO DE OBLIGACIÓN - AMORTIZACIÓN A CAPITAL',
                            ejecucion: '-',
                            esperado: 10418944,
                            cumplimiento: 0
                        }
                    },
                    {
                        key: '3-2-0',
                        data: {
                            concepto: 1,
                            descripcion: 'PAGO DE GASTOS BANCARIOS',
                            ejecucion: 5728365,
                            esperado: '-',
                            cumplimiento: 0
                        }
                    }
                ]
            }
        ]
    }
]); */
</script>

<style lang="scss" scoped>
//
</style>
