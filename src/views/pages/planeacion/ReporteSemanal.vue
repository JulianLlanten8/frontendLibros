<template>
    <div>
        <Toast />

        <DataTable
            :value="products"
            v-model:expandedRows="expandedRows"
            dataKey="id"
            @rowExpand="onRowExpand"
            @rowCollapse="onRowCollapse"
            responsiveLayout="scroll"
        >
            <template #header>
                <div class="table-header-container flex justify-content-end">
                    <Button icon="pi pi-plus" label="Expandir todo" @click="expandAll" class="mr-2" />
                    <Button icon="pi pi-minus" label="Colapsar todo" @click="collapseAll" />
                    <Button icon="pi pi-minus" label="Descargar Archivo" class="flex-wrap"></Button>
                </div>
            </template>
            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="id" header="Concepto" sortable></Column>
            <Column field="nombre" header="Descripcion" sortable></Column>
            <Column field="price" header="Ejecucion" sortable>
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="esperado" header="Esperado" sortable>
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.esperado) }}
                </template>
            </Column>
            <!-- <Column field="rating" header="Reviews" sortable>
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column> -->
            <Column field="cumplimientoGlobal" header="cumplimiento %" sortable></Column>
            <template #expansion="slotProps">
                <div v-if="slotProps.data.customers" class="orders-subtable">
                    <DataTable
                        :value="slotProps.data.customers"
                        rowGroupMode="subheader"
                        groupRowsBy="flujo.tipo"
                        sortMode="single"
                        sortField="flujo.tipo"
                        :sortOrder="1"
                        responsiveLayout="scroll"
                        :expandableRowGroups="true"
                        v-model:expandedRowGroups="expandedRowGroups"
                        @rowgroupExpand="onRowGroupEx"
                        @rowgroupCollapse="onRowGroupCollap"
                    >
                        <!-- cabecera del formulario de adentro -->
                        <template #groupheader="slotProps">
                            <span class="text-lg ml-1" :class="slotProps.data.flujo.color">
                                {{ slotProps.data.flujo.tipo }}
                            </span>
                        </template>
                        <!-- fin de la cabecera del formulario de adentro -->

                        <!-- cabeceras -->
                        <Column field="id" header="Concepto"></Column>
                        <Column field="country">
                            <template #body="slotProps">
                                <span class="image-text">{{ slotProps.data.descripciones }}</span>
                            </template>
                        </Column>

                        <Column field="ejecucion" header="Ejecucion"></Column>
                        <Column field="esperado" header="Esperado"></Column>

                        <Column field="cumplimiento" header="Cumplimiento"></Column>
                        <!-- cabeceras -->
                        <!-- <template #groupfooter="slotProps">
                            <td colspan="5" style="text-align: right">Total Customers</td>
                            <td>{{ calculateCustomerTotal(slotProps.data.flujo.tipo) }}</td>
                        </template> -->
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const onRowGroupEx = (event) => {
    toast.add({
        severity: 'info',
        summary: 'Group Expanded',
        detail: 'Value: ' + event.data,
        life: 3000
    });
};
const onRowGroupCollap = (event) => {
    toast.add({ severity: 'success', summary: 'Group Collapsed', detail: 'Value: ' + event.data, life: 3000 });
};
const expandedRowGroups = ref();

const calculateCustomerTotal = (name) => {
    let total = 0;

    if (customers.value) {
        for (let customer of customers.value) {
            if (customer.flujo.tipo === name) {
                total++;
            }
        }
    }

    return total;
};

const expandedRows = ref([]);
const onRowExpand = (event) => {
    toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.nombre, life: 3000 });
};
const onRowCollapse = (event) => {
    toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.nombre, life: 3000 });
};
const expandAll = () => {
    expandedRows.value = products.filter((p) => p.id);
    toast.add({ severity: 'success', summary: 'All Rows Expanded', life: 3000 });
};
const collapseAll = () => {
    expandedRows.value = null;
    toast.add({ severity: 'success', summary: 'All Rows Collapsed', life: 3000 });
};
const formatCurrency = (value) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
};
const customers = ref([
    {
        id: '1000',
        descripciones: 'RECAUDOS DE CARTERA',
        country: { name: 'USA', code: 'us' },
        ejecucion: 276367278,
        cumplimiento: '0%',
        esperado: 4000200500,
        flujo: { tipo: 'INGRESOS', color: 'text-green-500' }
    },
    {
        id: '1001',
        descripciones: 'PRESTAMOS BANCARIOS RECIBIDOS',
        country: { name: 'USA', code: 'us' },
        ejecucion: 276367278,
        cumplimiento: '-24%',
        esperado: 4000200500,
        flujo: { tipo: 'INGRESOS', color: 'text-green-500' }
    },
    {
        id: '1002',
        descripciones: 'INTERESES RECIBIDOS',
        country: { name: 'USA', code: 'us' },
        ejecucion: 276367278,
        cumplimiento: '126%',
        esperado: 4000200500,
        flujo: { tipo: 'INGRESOS', color: 'text-green-500' }
    },
    {
        id: '1003',
        descripciones: 'Michael Leverling',
        country: { name: 'Canada', code: 'ca' },
        ejecucion: 276367278,
        cumplimiento: '85%',
        esperado: 4000200500,
        flujo: { tipo: 'EGRESOS', color: 'text-red-500' }
    },
    {
        id: '1005',
        descripciones: 'Janet Leverling',
        country: { name: 'Canada', code: 'ca' },
        ejecucion: 276367278,
        cumplimiento: '92%',
        esperado: 4000200500,
        flujo: { tipo: 'EGRESOS', color: 'text-red-500' }
    }
]);

const products = reactive([
    {
        id: '1',
        code: 'f230fh0g3',
        nombre: 'SALDO INICIAL',
        price: 268224245803,
        esperado: 36822424583,
        quantity: 24,
        cumplimientoGlobal: '100%',
        customers: null
    },
    {
        id: '02',
        code: 'nvklal433',
        nombre: 'ACTIVIDAD DE OPERACION',
        price: 72,
        esperado: 685438974,
        quantity: 61,
        cumplimientoGlobal: '100%',
        customers: customers.value
    },
    {
        id: '03',
        code: 'zz21cz3c1',
        nombre: 'ACTIVIDAD DE INVERSION',
        price: 79,
        esperado: 1083233434,
        quantity: 2,
        cumplimientoGlobal: '100%',
        customers: customers.value
    },
    {
        id: '04',
        code: 'av2231fwg',
        nombre: 'ACTIVIDAD DE FINANCIACION',
        price: 120,
        esperado: 1083233434,
        quantity: 0,
        cumplimientoGlobal: '100%',
        customers: customers.value
    }
]);
</script>
<style lang="scss" scoped>
.p-rowgroup-footer td {
    font-weight: 700;
    background-color: var(--surface-d);
}
</style>
