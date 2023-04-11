<template>
    <main>
        <Card>
            <template #title>
                <h3>Flujo de caja semanal proyectado</h3>
            </template>
            <template #content>
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
        </Card>
    </main>
    <!-- <table v-if="flujoSemanalProyectado">
        <tr>
            <th>Concepto</th>
            <th>Descripcion</th>

            <th v-for="cabecera in cabecerasfor" :key="cabecera.key">
                {{ cabecera }}
            </th>

            
        </tr>
        
        <td>
            <tr v-for="concepto in generalTable.concepto" :key="concepto.key">
                {{
                    concepto
                }}
            </tr>
        </td>

        <td>
            <tr v-for="descripcion in generalTable.descripcion" :key="descripcion.key">
                {{
                    descripcion
                }}
            </tr>
        </td>

        
        <td v-for="pro in proyectado" :key="pro">
            <tr>
                {{
                    pro
                }}
            </tr>
        </td>
        
    </table> -->
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
const generalTable = ref([]);
const cabecerasfor = ref([]);

const cargandoSociedades = ref(false);

const cargandoSemanas = ref(false);

const cargandoTabla = ref(false);
const proyectado = ref([]);

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
            console.log(flujoSemanalProyectado.value[0]);
            let general = {};
            let concepto = [];
            let descripcion = [];
            for (const key in flujoSemanalProyectado.value[0]) {
                concepto.push(flujoSemanalProyectado.value[0][key].concepto);
                descripcion.push(flujoSemanalProyectado.value[0][key].descripcion);
            }
            general['concepto'] = concepto;
            general['descripcion'] = descripcion;
            generalTable.value = general;
            let cabeceras = [];
            let pro = [];

            for (var i = 0; i < flujoSemanalProyectado.value.length; i++) {
                cabeceras.push('ejecutado');
                cabeceras.push('esperado');
                cabeceras.push('cumplimiento');
                pro.push(flujoSemanalProyectado.value[i][0].ejecutado);
                pro.push(flujoSemanalProyectado.value[i][0].esperado);
                const cumplimiento = () => {
                    if (
                        (flujoSemanalProyectado.value[i][0].ejecutado === 0 &&
                            flujoSemanalProyectado.value[i][0].esperado === 0) ||
                        (flujoSemanalProyectado.value[i][0].ejecutado === null &&
                            flujoSemanalProyectado.value[i][0].esperado === null)
                    ) {
                        return 0;
                    } else {
                        return (
                            (flujoSemanalProyectado.value[i][0].ejecutado /
                                flujoSemanalProyectado.value[i][0].esperado) *
                            100
                        ).toFixed(2);
                    }
                };
                pro.push(`%${cumplimiento()}`);
            }
            console.log(pro);
            proyectado.value = pro;
            cabecerasfor.value = cabeceras;

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
table {
    border: 1px solid black;
    border-collapse: collapse;
    width: 100%;
}
</style>
