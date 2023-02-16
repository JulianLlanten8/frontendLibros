<template>
    <div>
        <Toast />
        <div class="card">
            <h5>FC SEMANAL</h5>
            <DataTable
                :value="ejecucion"
                rowGroupMode="subheader"
                groupRowsBy="representative.name"
                sortMode="single"
                sortField="representative.name"
                :sortOrder="1"
                responsiveLayout="scroll"
                :expandableRowGroups="true"
                v-model:expandedRowGroups="expandedRowGroups"
                @rowgroupExpand="onRowGroupExpand"
                @rowgroupCollapse="onRowGroupCollapse"
            >
                <ColumnGroup type="header">
                    <Row>
                        <Column :rowspan="2">
                            <template #header>
                                <div class="p-d-flex p-jc-center">
                                    <div class="p-mr-2">Fecha</div>
                                    <Calendar
                                        inputId="range"
                                        v-model="rango"
                                        :max-date="diaMaximo.max"
                                        :min-date="diaMaximo.min"
                                        selectionMode="range"
                                        :manualInput="true"
                                        :disabledDays="[0, 6]"
                                    />
                                </div>
                            </template>
                        </Column>
                        <Column header="Semana" :colspan="6" />
                    </Row>
                    <Row>
                        <Column header="Semana (01-31) Dic" :colspan="6" />
                    </Row>
                    <Row>
                        <Column field="representative.concepto" header="Concepto" />
                        <Column field="representative.name" header="Nombre" :sortable="true" />
                        <Column field="nombre" header="Descripcion" :sortable="true" />
                        <Column field="ejecucion" header="Ejecucion" :sortable="true" />
                        <Column field="esperado" header="Esperado" :sortable="true" />
                        <Column field="porcentaje" header="%" :sortable="true" />
                    </Row>
                </ColumnGroup>
                <Column field="representative.concepto" header="Concepto"></Column>
                <Column field="representative.name" header="Representative"></Column>
                <Column field="nombre" header="DESCRIPCION"></Column>
                <Column field="ejecucion" header="EJECUCION"></Column>
                <Column field="esperado" header="ESPERADO"></Column>
                <Column field="porcentaje" header="%">
                    <template #body="slotProps">
                        <Tag :severity="`${escalaColor(slotProps.data.porcentaje)}`">
                            {{ slotProps.data.porcentaje }} %
                        </Tag>
                    </template>
                </Column>
                <template #groupheader="slotProps">
                    <img
                        :alt="slotProps.data.representative.name"
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        width="32"
                        style="vertical-align: middle"
                    />
                    <span class="image-text">{{ slotProps.data.representative.name }}</span>
                </template>
                <template #groupfooter="slotProps">
                    <td colspan="2">Total</td>
                    <td>
                        {{ $formatoMonedaCOP(calcularTotalEjecucion(slotProps.data.representative.name)) }}
                    </td>
                    <td>
                        {{ $formatoMonedaCOP(calcularTotalEsperado(slotProps.data.representative.name)) }}
                    </td>
                    <td>
                        <Tag :severity="`${escalaColor(calcularPorcentaje(slotProps.data.representative.name))}`">
                            {{ calcularPorcentaje(slotProps.data.representative.name) }} %
                        </Tag>
                    </td>
                </template>
            </DataTable>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
const expandedRowGroups = ref();
const rango = ref();
const diaMaximo = reactive({
    min: reactive(new Date(2020, 11, 1)),
    max: reactive(new Date(new Date() + 1))
});
const toast = useToast();
const calcularPorcentaje = (name) => {
    let porcentaje = 0;
    let promedio = 0;

    if (ejecucion.value) {
        for (let customer of ejecucion.value) {
            if (customer.representative.name === name) {
                porcentaje += customer.porcentaje;
                promedio++;
            }
        }
    }

    return Math.round(porcentaje / promedio);
};
const calcularTotalEjecucion = (name) => {
    let ejecucion = 0;

    if (ejecucion.value) {
        for (let customer of ejecucion.value) {
            if (customer.representative.name === name) {
                ejecucion += customer.ejecucion;
            }
        }
    }

    return ejecucion;
};

const calcularTotalEsperado = (name) => {
    let esperado = 0;

    if (ejecucion.value) {
        for (let customer of ejecucion.value) {
            if (customer.representative.name === name) {
                esperado += customer.esperado;
            }
        }
    }

    return esperado;
};

const escalaColor = (porcentaje) => {
    if (porcentaje >= 80) return 'success';
    if (porcentaje >= 1) return 'warning';
    if (porcentaje == 0) return 'info';
    return 'danger';
};

const onRowGroupExpand = (event) => {
    toast.add({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data, life: 3000 });
};
const onRowGroupCollapse = (event) => {
    toast.add({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data, life: 3000 });
};
const ejecucion = ref([
    {
        id: 1000,
        nombre: 'SALDO INICIAL',
        ejecucion: 2763672789,
        esperado: 2763672789,
        porcentaje: 100,
        representative: {
            name: 'SALDO INICIAL',
            image: 'ionibowcher.png'
        }
    },
    {
        id: 1001,
        nombre: 'RECAUDOS FEE PAO',
        ejecucion: 1700763213,
        esperado: 1788523079,
        porcentaje: 95,
        representative: {
            name: 'ACTIVIDAD DE OPERACION',
            image: 'amyelsner.png'
        }
    },
    {
        id: 1002,
        nombre: 'CAPEX TICAPEX TI (LICENCIAS)',
        ejecucion: 123,
        esperado: 1381836394,
        porcentaje: 95,
        representative: {
            name: 'ACTIVIDAD DE INVERSION',
            image: 'asiyajavayant.png'
        }
    },
    {
        id: 1002,
        nombre: 'CAPEX RECOBRO',
        ejecucion: 123,
        esperado: 12581836394,
        porcentaje: 95,
        representative: {
            name: 'ACTIVIDAD DE INVERSION',
            image: 'asiyajavayant.png'
        }
    },
    //tres
    {
        id: 1003,
        nombre: 'RECAUDOS FEE PAO',
        ejecucion: 123,
        esperado: 1000000,
        porcentaje: 100,
        representative: {
            name: 'ACTIVIDAD DE FINANCIACION',
            image: 'xuxuefeng.png'
        }
    },
    {
        id: 1003,
        nombre: 'RECAUDOS FEE CS-CC',
        ejecucion: 123,
        esperado: 4356121315,
        porcentaje: 0,
        representative: {
            name: 'ACTIVIDAD DE FINANCIACION',
            image: 'xuxuefeng.png'
        },
        balance: 88521
    },
    {
        id: 1003,
        nombre: 'OTROS RECAUDOS',
        ejecucion: 123,
        esperado: 871224263,
        porcentaje: 80,
        representative: {
            name: 'ACTIVIDAD DE FINANCIACION',
            image: 'xuxuefeng.png'
        }
    },

    //tres fin

    {
        id: 1004,
        nombre: 'PAGO DE IVA',
        ejecucion: 123,
        esperado: 2013672789,
        porcentaje: 86,
        representative: {
            name: 'OTROS EGRESOS',
            image: 'asiyajavayant.png'
        }
    },
    {
        id: 1004,
        nombre: 'PAGO DE RETENCIÓN EN LA FUENTE',
        ejecucion: 123,
        esperado: 2013672789,
        porcentaje: 62,
        representative: {
            name: 'OTROS EGRESOS',
            image: 'asiyajavayant.png'
        }
    },
    {
        id: 1004,
        nombre: 'PAGO DE IMPUESTOS (RENTA, CREE Y RIQUEZA)',
        ejecucion: 123,
        esperado: 2013672789,
        porcentaje: 86,
        representative: {
            name: 'OTROS EGRESOS',
            image: 'asiyajavayant.png'
        }
    },
    {
        id: 1004,
        nombre: 'PAGO DE OTROS EGRESOS',
        ejecucion: 123,
        esperado: 2013672789,
        porcentaje: 86,
        representative: {
            name: 'OTROS EGRESOS',
            image: 'asiyajavayant.png'
        }
    },
    {
        id: 1005,
        nombre: 'FLUJO NETO',
        ejecucion: 112685229,
        esperado: 478279839,
        porcentaje: -92,
        representative: {
            name: 'FLUJO NETO',
            image: 'ivanmagalhaes.png'
        }
    },
    {
        id: 1006,
        nombre: 'SALDO DE CAJA FINAL',
        ejecucion: 2876358018,
        esperado: 2713672789,
        porcentaje: 0,
        representative: {
            name: 'SALDO DE CAJA FINAL',
            image: 'ivanmagalhaes.png'
        }
    },
    {
        id: 1007,
        nombre: 'Leota Dilliard',
        ejecucion: 2285392950,
        esperado: 72789,
        porcentaje: 144,
        representative: {
            name: 'Sobregiro SEC',
            image: 'onyamalimba.png'
        }
    }
]);
</script>
<style lang="scss" scoped>
.p-rowgroup-footer td {
    font-weight: 700;
    background-color: var(--surface-d);
}
</style>
