<template>
    <div>
        <div style="margin-bottom: 1em">
            <SelectButton v-model="value1" :options="options" aria-labelledby="single" @change="e" />
        </div>
        <TreeTable :value="nodes" :expandedKeys="expandedKeys" :filters="filters1" filterMode="lenient">
            <template #header>
                Flujo de caja semanal :
                <Dropdown
                    v-model="selectedCity2"
                    :options="cities"
                    optionLabel="name"
                    :editable="true"
                    placeholder="Selecione una sociedad"
                />
                <div class="text-right">
                    <div class="p-input-icon-left">
                        <i class="pi pi-search"></i>
                        <InputText v-model="filters1['global']" placeholder="Busqueda ..." size="50" />
                    </div>
                </div>
            </template>
            <Column field="concepto" header="Concepto" headerStyle="width: 10%"></Column>
            <Column
                field="descripcion"
                header="Descripcion"
                headerStyle="w-auto  white-space-nowrap overflow-hidden text-overflow-ellipsis"
                :expander="true"
            ></Column>
            <Column field="ejecucion" header="Ejecucion" headerStyle="width: 20%"></Column>
            <Column field="esperado" header="Esperados" headerStyle="width: 20%"></Column>
            <Column field="cumplimiento" header="Cumplimiento %" headerStyle="width: 10%"></Column>
            <!-- <Column headerStyle="width: 10rem" headerClass="text-center" bodyClass="text-center">
                <template #header>
                    <Button type="button" icon="pi pi-download"></Button>
                </template>
                <template #body>
                    <Button
                        type="button"
                        icon="pi pi-search"
                        class="p-button-success"
                        style="margin-right: 0.5em"
                    ></Button>
                    <Button type="button" icon="pi pi-pencil" class="p-button-warning"></Button>
                </template>
            </Column> -->
            <template #footer>
                <div style="text-align: center">
                    <Button icon="pi pi-download" @click="imprimir" />
                </div>
            </template>
        </TreeTable>
    </div>
</template>
<script setup>
import { ref /* reactive */ } from 'vue';
// import { useToast } from 'primevue/usetoast';
import { obtenerTodo } from '@/service/clienteHttp';

const expandedKeys = ref({});
const filters1 = ref({});
const value1 = ref('Off');
const options = ref(['Off', 'On']);
// const toast = useToast();

const imprimir = async () => {
    const res = await obtenerTodo('archivos/descargar', 'blob');
    const url = URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel' }));

    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'flujos.xlsx');
    document.body.appendChild(link);
    link.click();
};

const e = (e) => {
    if (e.value === 'On') {
        expandAll();
    } else if (e.value === 'Off') {
        collapseAll();
    }
};
const expandAll = () => {
    for (let node of nodes.value) {
        expandNode(node);
    }

    expandedKeys.value = { ...expandedKeys.value };
};

const collapseAll = () => {
    expandedKeys.value = {};
};

const expandNode = (node) => {
    if (node.children && node.children.length) {
        expandedKeys.value[node.key] = true;

        for (let child of node.children) {
            expandNode(child);
        }
    }
};
const selectedCity2 = ref(null);
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const nodes = ref([
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
                    esperado: 'Folder',
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
                            ejecucion: '10kb',
                            esperado: 'Application',
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
                data: { concepto: 1, descripcion: 'Ingresos', ejecucion: '25kb', esperado: 'Folder', cumplimiento: 80 },
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
                    ejecucion: '25kb',
                    esperado: 'Folder',
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
                            ejecucion: '10kb',
                            esperado: 'Application',
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
]);
</script>
<style lang="scss" scoped>
.p-rowgroup-footer td {
    font-weight: 700;
    background-color: var(--surface-d);
}
</style>
