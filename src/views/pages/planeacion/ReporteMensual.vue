<template>
  <div>
    <Toast />
    <div class="card">
      <h5>Expandable Row Groups</h5>
      <DataTable :value="customers" rowGroupMode="subheader" groupRowsBy="representative.name" sortMode="single"
        sortField="representative.name" :sortOrder="1" responsiveLayout="scroll" :expandableRowGroups="true"
        v-model:expandedRowGroups="expandedRowGroups" @rowgroupExpand="onRowGroupExpand"
        @rowgroupCollapse="onRowGroupCollapse">
        <Column field="representative.name" header="Representative"></Column>
        <Column field="name" header="DESCRIPCION"></Column>
        <Column field="country" header="Ejecucion">
          <template #body="slotProps">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" />
            <span class="image-text">{{ slotProps.data.country.name }}</span>
          </template>
        </Column>
        <Column field="company" header="Esperado"></Column>
        <Column field="status" header="%">
          <template #body="slotProps">
            <span :class="'customer-badge status-' + slotProps.data.status">{{ slotProps.data.status }}</span>
          </template>
        </Column>
        <Column field="date" header="Date"></Column>
        <template #groupheader="slotProps">
          <img :alt="slotProps.data.representative.name"
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="32"
            style="vertical-align: middle" />
          <span class="image-text">{{ slotProps.data.representative.name }}</span>
        </template>
        <template #groupfooter="slotProps">
          <td colspan="4" style="text-align: right">Total Customers</td>
          <td>{{ calculateCustomerTotal(slotProps.data.representative.name) }}</td>
        </template>
      </DataTable>
    </div>
  </div>
</template>
<script setup >
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
const expandedRowGroups = ref();
const toast = useToast();
const calculateCustomerTotal = (name) => {
  let total = 0;

  if (customers.value) {
    for (let customer of customers.value) {
      if (customer.representative.name === name) {
        total++;
      }
    }
  }

  return total;
};
const onRowGroupExpand = (event) => {
  toast.add({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data, life: 3000 });
};
const onRowGroupCollapse = (event) => {
  toast.add({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data, life: 3000 });
};
const customers = ref(
  [
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "John B Jr",
      "date": "2015-09-13",
      "status": "unqualified",
      "verified": false,
      "activity": 16,
      "representative": {
        "name": "SALDO INICIAL",
        "image": "ionibowcher.png"
      },
      "balance": 80663
    },
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "Benton",
      "date": "2015-09-13",
      "status": "unqualified",
      "verified": true,
      "activity": 17,
      "representative": {
        "name": "SALDO INICIAL",
        "image": "ionibowcher.png"
      },
      "balance": 70663
    },
    {
      "id": 1001,
      "name": "Josephine Darakjy",
      "country": {
        "name": "Egypt",
        "code": "eg"
      },
      "company": "Chanay, Jeffrey A Esq",
      "date": "2019-02-09",
      "status": "proposal",
      "verified": true,
      "activity": 0,
      "representative": {
        "name": "ACTIVIDAD DE OPERACION",
        "image": "amyelsner.png"
      },
      "balance": 82429
    },
    {
      "id": 1002,
      "name": "Art Venere",
      "country": {
        "name": "Panama",
        "code": "pa"
      },
      "company": "Chemel, James L Cpa",
      "date": "2017-05-13",
      "status": "qualified",
      "verified": false,
      "activity": 63,
      "representative": {
        "name": "ACTIVIDAD DE INVERSION",
        "image": "asiyajavayant.png"
      },
      "balance": 28334
    },
    //tres
    {
      "id": 1003,
      "name": "RECAUDOS FEE PAO",
      "country": {
        "name": "Slovenia",
        "code": "si"
      },
      "company": 1000000,
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "ACTIVIDAD DE FINANCIACION",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },
    {
      "id": 1003,
      "name": "RECAUDOS FEE CS-CC",
      "country": {
        "name": "Slovenia",
        "code": "si"
      },
      "company": 4400000,
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "ACTIVIDAD DE FINANCIACION",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },
    {
      "id": 1003,
      "name": "OTROS RECAUDOS",
      "country": {
        "name": "Slovenia",
        "code": "si"
      },
      "company": 23000000,
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "ACTIVIDAD DE FINANCIACION",
        "image": "xuxuefeng.png"
      },
      "balance": 88521
    },

    //tres fin

    {
      "id": 1004,
      "name": "Donette Foller",
      "country": {
        "name": "South Africa",
        "code": "za"
      },
      "company": "Printing Dimensions",
      "date": "2016-05-20",
      "status": "proposal",
      "verified": true,
      "activity": 33,
      "representative": {
        "name": "OTROS EGRESOS",
        "image": "asiyajavayant.png"
      },
      "balance": 93905
    },
    {
      "id": 1005,
      "name": "Simona Morasca",
      "country": {
        "name": "Egypt",
        "code": "eg"
      },
      "company": "Chapman, Ross E Esq",
      "date": "2018-02-16",
      "status": "qualified",
      "verified": false,
      "activity": 68,
      "representative": {
        "name": "FLUJO NETO",
        "image": "ivanmagalhaes.png"
      },
      "balance": 50041
    },
    {
      "id": 1006,
      "name": "Mitsue Tollner",
      "country": {
        "name": "Paraguay",
        "code": "py"
      },
      "company": "Morlong Associates",
      "date": "2018-02-19",
      "status": "renewal",
      "verified": true,
      "activity": 54,
      "representative": {
        "name": "SALDO DE CAJA FINAL",
        "image": "ivanmagalhaes.png"
      },
      "balance": 58706
    },
    {
      "id": 1007,
      "name": "Leota Dilliard",
      "country": {
        "name": "Serbia",
        "code": "rs"
      },
      "company": "Commercial Press",
      "date": "2019-08-13",
      "status": "renewal",
      "verified": true,
      "activity": 69,
      "representative": {
        "name": "Sobregiro SEC",
        "image": "onyamalimba.png"
      },
      "balance": 26640
    }
  ]
)
</script>
<style scoped>

</style>