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
                <div class="table-header-container">
                    <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2" />
                    <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="nombre" header="Descripcion" sortable></Column>
            <Column field="descripcion" header="Descripcion" sortable></Column>
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
            <Column field="rating" header="Reviews" sortable>
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column>
            <Column field="inventoryStatus" header="%" sortable>
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">
                        {{ slotProps.data.inventoryStatus }}
                    </span>
                </template>
            </Column>
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
                        <Column field="flujo.tipo" header="Representative"></Column>
                        <Column field="tipo"></Column>
                        <Column field="country">
                            <template #body="slotProps">
                                <img
                                    src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                                    width="30"
                                />
                                <span class="image-text">{{ slotProps.data.country.name }}</span>
                            </template>
                        </Column>
                        <Column field="company" header="Company"></Column>
                        <!-- cabeceras -->

                        <Column field="status" header="status">
                            <template #body="slotProps">
                                <span :class="'customer-badge status-' + slotProps.data.status">
                                    {{ slotProps.data.status }}
                                </span>
                            </template>
                        </Column>

                        <Column field="date" header="Date"></Column>

                        <template #groupfooter="slotProps">
                            <td colspan="4" style="text-align: right">Total Customers</td>
                            <td>{{ calculateCustomerTotal(slotProps.data.flujo.tipo) }}</td>
                        </template>
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
        name: 'RECAUDOS DE CARTERA',
        country: { name: 'USA', code: 'us' },
        company: 'Anderson Co',
        date: '2012/01/01',
        status: 'qualified',
        flujo: { tipo: 'INGRESOS', color: 'text-green-500' }
    },
    {
        id: '1001',
        name: 'PRESTAMOS BANCARIOS RECIBIDOS',
        country: { name: 'USA', code: 'us' },
        company: 'Davolio Co',
        date: '2012/02/01',
        status: 'unqualified',
        flujo: { tipo: 'INGRESOS', color: 'text-green-500' }
    },
    {
        id: '1002',
        name: 'INTERESES RECIBIDOS',
        country: { name: 'USA', code: 'us' },
        company: 'Davolio Co',
        date: '2012/02/01',
        status: 'unqualified',
        flujo: { tipo: 'INGRESOS', color: 'text-green-500' }
    },
    {
        id: '1003',
        name: 'Michael Leverling',
        country: { name: 'Canada', code: 'ca' },
        company: 'Leverling Co',
        date: '2012/03/01',
        status: 'qualified',
        flujo: { tipo: 'EGRESOS', color: 'text-red-500' }
    },
    {
        id: '1005',
        name: 'Janet Leverling',
        country: { name: 'Canada', code: 'ca' },
        company: 'Leverling Co',
        date: '2012/03/01',
        status: 'qualified',
        flujo: { tipo: 'EGRESOS', color: 'text-red-500' }
    }
]);

const products = reactive([
    {
        id: '1000',
        code: 'f230fh0g3',
        nombre: 'SALDO INICIAL',
        descripcion: '',
        price: 268224245803,
        esperado: 36822424583,
        quantity: 24,
        inventoryStatus: '',
        rating: 0,
        customers: null
    },
    {
        id: '1001',
        code: 'nvklal433',
        nombre: 'ACTIVIDAD DE OPERACION',
        descripcion: 'Product Description',
        price: 72,
        esperado: 685438974,
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4,
        customers: customers.value
    },
    {
        id: '1002',
        code: 'zz21cz3c1',
        nombre: 'ACTIVIDAD DE INVERSION',
        descripcion: 'Product Description',
        price: 79,
        esperado: 1083233434,
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        customers: customers.value
    },
    {
        id: '1005',
        code: 'av2231fwg',
        nombre: 'ACTIVIDAD DE FINANCIACION',
        descripcion: 'Product Description',
        price: 120,
        esperado: 1083233434,
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
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
