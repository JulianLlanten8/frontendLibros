<template>
    <main>
        <DataTable id="tablaFlujos" :value="flujo_caja" :loading="cargandoTabla" scrollable>
            <template #header>
                <h3>Flujo de caja semanal proyectado</h3>
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
                                @change="ObtenerFlujosProyectados(sociedadSeleccionada, semana)"
                            />
                        </div>
                    </template>
                    <template #end>
                        <div class="text-center p-d-flex p-jc-between">
                            <Button
                                label="Imprimir"
                                icon="pi pi-print"
                                :disabled="flujoSemanalProyectado.length === 0"
                                loadingIcon="pi pi-spin pi-clock"
                                :loading="cargandoImprimir"
                                class="p-button-success p-mr-2"
                                @click="imprimir(flujoSemanalProyectado)"
                            />
                        </div>
                    </template>
                </Toolbar>
            </template>
            <template #empty v-if="flujoSemanalProyectado.length === 0">
                <p class="text-center">Seleccione una sociedad y semana inicial</p>
            </template>
            <template #loading> <h3 class="text-white my-10">Cargando flujos, Por favor espere ...</h3> </template>
            <!--<Column field="concepto" header="Concepto">
                <template #body="slotProps">
                    <span>
                        {{ slotProps.data.concepto }}
                    </span>
                </template>
            </Column>
            <Column field="descripcion" header="Concepto">
                <template #body="slotProps">
                    <span>
                        {{ slotProps.data.descripcion }}
                    </span>
                </template>
            </Column>
            <Column field="0" header="prueba"> </Column> -->
            <Column field="" header=""></Column>

            <!-- <template #footer> </template> -->
        </DataTable>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { obtenerTodo /* crear */ } from '@/service/clienteHttp';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const sociedadSeleccionada = ref(null);

const semana = ref(null);

const sociedades = ref([]);

const semanas = ref([]);

const flujoSemanalProyectado = ref([]);

const cargandoSociedades = ref(false);

const cargandoSemanas = ref(false);

const cargandoTabla = ref(false);

const flujo_caja = ref([]);
const cargandoImprimir = ref(false);

onMounted(() => {
    obtenerSociedades();
});

/* const claseTituloSubtitulo = (concepto) => {
    if (concepto <= 2) {
        return 'font-bold';
    } else {
        return 'ml-3';
    }
}; */

const ObtenerFlujosProyectados = (sociedad, fecha) => {
    cargandoTabla.value = true;
    fecha = fecha.replace(/\//g, '.');
    obtenerTodo(`esperado/obtenerTodo/${sociedad}/${fecha}`)
        .then((res) => {
            flujoSemanalProyectado.value = res;
            /* res[0].map((e, i) => {
                flujo_caja.value.push({
                    concepto: e.concepto,
                    descripcion: e.descripcion
                });
            });
            res.map((e, index) => {
                flujo_caja.value.push({
                    ejecutado: res[index].map((e) => {
                        return e.ejecutado;
                    }),
                    esperado: res[index].map((e) => {
                        return e.esperado;
                    })
                });
                console.log(flujo_caja.value);
            }); */

            toast.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Flujos obtenidos correctamente',
                life: 5000
            });
        })
        .catch((err) => {
            toast.add({
                severity: 'danger',
                summary: 'Error',
                detail: `Ups! algo salio mal al obtener los flujos proyectados error: ${err}`,
                life: 5000
            });
        })
        .finally(() => {
            cargandoTabla.value = false;
        });
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
                summary: 'Error',
                detail: `Ups! algo salio mal al obtener las sociedades error: ${err}`,
                life: 5000
            });
        })
        .finally(() => {
            cargandoSemanas.value = false;
        });
};

const filtroSociedades = (sociedad) => {
    if (semanas.value.length > 0) {
        ObtenerFlujosProyectados(sociedadSeleccionada.value, semana.value.name);
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

const imprimir = async () => {
    //remplaza fecha.value 1/03/2023-5/03/2023 por 1.03.2023-5.03.2023
    cargandoImprimir.value = true;
    let fecha = semana.value.replace(/\//g, '.');
    obtenerTodo(`/esperado/esperadoSemanalProyectado/${sociedadSeleccionada.value}/${fecha}`, 'blob')
        .then((res) => {
            const url = URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel' }));

            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', `Flujo de caja proyectado ${sociedadSeleccionada.value} ${fecha}.xlsx`);
            document.body.appendChild(link);
            link.click();
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
            cargandoImprimir.value = false;
        });
};
</script>

<style lang="scss" scoped>
//
</style>
