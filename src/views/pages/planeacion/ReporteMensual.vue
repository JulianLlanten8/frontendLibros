<template>
    <div>
        <Toast />
        <div class="card">
            <h3>Subheader Grouping</h3>
            <DataTable
                :value="cars"
                rowGroupMode="subheader"
                groupRowsBy="brand"
                sortMode="single"
                sortField="brand"
                :sortOrder="1"
            >
                <Column field="brand" header="Brand"></Column>
                <Column field="vin" header="Vin"></Column>
                <Column field="year" header="Year"></Column>
                <Column field="color" header="Color"></Column>
                <Column field="price" header="Price"></Column>
                <template #groupheader="slotProps">
                    <span>{{ slotProps.data.brand }}</span>
                </template>
                <template #groupfooter="slotProps">
                    <td colspan="3" style="text-align: right">Total Price</td>
                    <td>{{ calculateGroupTotal(slotProps.data.brand) }}</td>
                </template>
            </DataTable>

            <h3>Expandable Row Groups</h3>
            <DataTable
                :value="cars"
                rowGroupMode="subheader"
                groupRowsBy="brand"
                sortMode="single"
                sortField="brand"
                :sortOrder="1"
                :expandableRowGroups="true"
                v-model:expandedRowGroups="expandedRowGroups"
                @rowgroup-expand="onRowExpand"
                @rowgroup-collapse="onRowCollapse"
            >
                <Column field="brand" header="Brand"></Column>
                <Column field="vin" header="Vin"></Column>
                <Column field="year" header="Year"></Column>
                <Column field="color" header="Color"></Column>
                <Column field="price" header="Price"></Column>
                <template #groupheader="slotProps">
                    <span>{{ slotProps.data.brand }}</span>
                </template>
                <template #groupfooter="slotProps">
                    <td colspan="3" style="text-align: right">Total Price</td>
                    <td>{{ calculateGroupTotal(slotProps.data.brand) }}</td>
                </template>
            </DataTable>

            <h3>RowSpan Grouping</h3>
            <DataTable
                :value="cars"
                rowGroupMode="rowspan"
                groupRowsBy="brand"
                sortMode="single"
                sortField="brand"
                :sortOrder="1"
            >
                <Column header="#" headerStyle="width:3em">
                    <template #body="slotProps">
                        {{ slotProps.index }}
                    </template>
                </Column>
                <Column field="brand" header="Brand"></Column>
                <Column field="year" header="Year"></Column>
                <Column field="vin" header="Vin"></Column>
                <Column field="color" header="Color"></Column>
                <Column field="price" header="Price"></Column>
            </DataTable>
            <DataTable
                :value="cars"
                v-model:expandedRows="expandedRows"
                dataKey="vin"
                @row-expand="onRowExpand"
                @row-collapse="onRowCollapse"
            >
                <template #header>
                    <div class="table-header-container">
                        <Button icon="pi pi-plus" label="Expand All" @click="expandAll" />
                        <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                    </div>
                </template>
                <Column :expander="true" headerStyle="width: 3em" />
                <Column field="vin" header="Vin"></Column>
                <Column field="year" header="Year"></Column>
                <Column field="brand" header="Brand"></Column>
                <Column field="color" header="Color"></Column>
                <template #expansion="slotProps">
                    <div class="car-details">
                        <div>
                            <img :src="'images/car/' + slotProps.data.brand + '.png'" :alt="slotProps.data.brand" />
                            <div class="grid">
                                <div class="col-12">
                                    Vin: <b>{{ slotProps.data.vin }}</b>
                                </div>
                                <div class="col-12">
                                    Year: <b>{{ slotProps.data.year }}</b>
                                </div>
                                <div class="col-12">
                                    Brand: <b>{{ slotProps.data.brand }}</b>
                                </div>
                                <div class="col-12">
                                    Color: <b>{{ slotProps.data.color }}</b>
                                </div>
                            </div>
                        </div>
                        <Button icon="pi pi-search"></Button>
                    </div>
                </template>
            </DataTable>
            <DataTable :value="cars" :resizableColumns="true" columnResizeMode="fit | expand">
                <Column field="vin" header="Vin"></Column>
                <Column field="year" header="Year"></Column>
                <Column field="brand" header="Brand"></Column>
                <Column field="color" header="Color"></Column>
            </DataTable>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
const expandedRowGroups = ref();
const toast = useToast();
const calculateGroupTotal = (brand) => {
    let total = 0;
    cars.value.forEach((car) => {
        if (car.brand === brand) {
            total += car.price;
        }
    });
    return total;
};
const onRowExpand = (event) => {
    toast.add({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data, life: 3000 });
};

const expandedRows = ref([]);
const expandAll = () => {
    expandedRows.value = cars.value.map((car) => car.vin);
};
const collapseAll = () => {
    expandedRows.value = [];
};

const onRowCollapse = (event) => {
    toast.add({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data, life: 3000 });
};

const cars = ref([
    { brand: 'Volkswagen', year: 2012, color: 'Orange', vin: 'dsad231ff' },
    { brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345' },
    { brand: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr' },
    { brand: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh' },
    { brand: 'Mercedes', year: 1995, color: 'Orange', vin: 'hrtwy34' },
    { brand: 'Volvo', year: 2005, color: 'Black', vin: 'jejtyj' },
    { brand: 'Honda', year: 2012, color: 'Yellow', vin: 'g43gr' },
    { brand: 'Jaguar', year: 2013, color: 'Orange', vin: 'greg34' },
    { brand: 'Ford', year: 2000, color: 'Black', vin: 'h54hw5' },
    { brand: 'Fiat', year: 2013, color: 'Red', vin: '245t2s' }
]);
</script>
<style scoped></style>
