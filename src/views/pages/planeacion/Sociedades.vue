<template>
    <main>
        <Toast />
        <DataTable
            :value="sociedades"
            :paginator="true"
            :loading="cargandoSociedades"
            :rows="10"
            :filters="filters"
            :rowsPerPageOptions="[5, 10, 20]"
            :paginatorTemplate="'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown'"
            :currentPageReportTemplate="'Mostrando {first} a {last} de {totalRecords} sociedades'"
            :globalFilterFields="['id', 'nit', 'nombre', 'razon_social', 'created_at', 'deleted_at']"
            responsiveLayout="scroll"
            ref="dt"
        >
            <template #header>
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <Button
                            label="Crear"
                            icon="pi pi-plus"
                            class="p-button-success p-mr-2"
                            @click="crearSociedad()"
                        />
                    </template>
                </Toolbar>
                <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 class="m-0">Administración de Sociedades</h5>
                    <span class="block mt-2 md:mt-0 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </span>
                </div>
            </template>
            <template #loading> <h3 class="text-white my-10">Cargando sociedades, Por favor espere ...</h3> </template>
            <Column field="codigo" header="CODIGO"></Column>
            <Column field="nit" header="NIT"></Column>
            <Column field="nombre" header="Nombre" headerStyle="width:30%; min-width:20rem;"></Column>
            <Column field="razon_social" header="Razon Social"></Column>
            <Column field="created_at" header="Creación" headerStyle="width:10%; min-width:10rem;">
                <template #body="slotProps">
                    <span>{{ $formatoFecha(slotProps.data.created_at) }}</span>
                </template>
            </Column>
            <Column field="deleted_at" header="Estado" headerStyle="width:5%; min-width:5rem;">
                <template #body="slotProps">
                    <span v-if="slotProps.data.deleted_at == null" class="p-tag p-tag-success">Activo</span>
                    <span v-else class="p-tag p-tag-danger">Inactivo</span>
                </template>
            </Column>
            <Column headerStyle="width:5%; min-width:5rem;">
                <template #body="slotProps">
                    <Button
                        icon="pi pi-pencil"
                        class="p-button-rounded p-button-success p-mr-2"
                        @click="editarSociedad(slotProps.data)"
                    />
                </template>
            </Column>
        </DataTable>

        <Dialog
            v-model:visible="sociedadDialogo"
            :style="{ width: '450px' }"
            :header="sociedad?.id ? 'Editar sociedad' : 'Crear sociedad'"
            :modal="true"
            class="p-fluid"
        >
            <!-- v$.nombre.required.$invalid: El nombre es requerido-->
            <form @submit="guardarSociedad(!v$.$invalid)" class="flex flex-column gap-2">
                <div class="p-field mb-3">
                    <label for="codigo">Codigo <span class="p-error">*</span></label>
                    <InputNumber id="codigo" nombre="codigo" v-model="sociedad.codigo" placeholder="Codigo" />
                    <small v-if="enviar && v$?.nombre?.required.$invalid" class="p-error text-xs">
                        {{ v$?.codigo?.required.$message }}
                    </small>
                </div>
                <div class="p-field mb-3">
                    <label for="nombre">Nombre <span class="p-error">*</span></label>
                    <InputText id="nombre" nombre="nombre" v-model="sociedad.nombre" placeholder="Nombre" />
                    <small v-if="enviar && v$?.nombre?.required.$invalid" class="p-error text-xs">
                        {{ v$?.nombre?.required.$message }}
                    </small>
                </div>
                <div class="p-field mb-3">
                    <label for="descripcion">Descripcion <span class="p-error">*</span></label>
                    <InputText
                        id="descripcion"
                        nombre="descripcion"
                        v-model="sociedad.descripcion"
                        placeholder="Descripcion"
                    />
                    <small v-if="enviar && v$?.descripcion?.required.$invalid" class="p-error text-xs">
                        {{ v$?.descripcion?.required.$message }}
                    </small>
                </div>
                <div class="p-field mb-3">
                    <label for="razon_social">Razon social <span class="p-error">*</span></label>
                    <InputText
                        id="razon_social"
                        nombre="razon_social"
                        v-model="sociedad.razon_social"
                        placeholder="Razon social"
                    />
                    <small v-if="enviar && v$.razon_social?.required.$invalid" class="p-error text-xs">
                        {{ v$?.razon_social?.required.$message }}
                    </small>
                </div>
                <div class="p-field mb-3">
                    <label for="nit">NIT <span class="p-error">*</span></label>
                    <InputText id="nit" nombre="nit" v-model="sociedad.nit" placeholder="NIT" />
                    <small v-if="enviar && v$.nit.required.$invalid" class="p-error text-xs">
                        {{ v$?.nit?.required.$message }}
                    </small>
                </div>

                <div class="p-field mb-3">
                    <label for="estado">Estado</label>
                    <ToggleButton
                        id="estado"
                        nombre="estado"
                        v-model="sociedad.deleted_at"
                        onLabel="Desactivado"
                        offLabel="Habilitado"
                        onIcon="pi pi-times"
                        offIcon="pi pi-check"
                        class="w-full"
                    />
                </div>
            </form>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialogo()" />
                <Button
                    label="Guardar"
                    icon="pi pi-check"
                    class="p-button-text"
                    :disabled="enviar && v$.$invalid"
                    :loading="guardandoSociedad"
                    @click="guardarSociedad(!v$.$invalid)"
                />
            </template>
        </Dialog>
    </main>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, computed } from 'vue';
import { obtenerTodo, crear, actualizar } from '@/service/clienteHttp.js';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, numeric } from '@vuelidate/validators';

const toast = useToast();
const filters = ref({});
const sociedades = ref([]);
const cargandoSociedades = ref(false);
const sociedad = ref({});
const sociedadDialogo = ref(false);
const enviar = ref(false);
const guardandoSociedad = ref(false);

const reglas = computed(() => {
    return {
        codigo: { required: helpers.withMessage('El codigo es requerido o el valor no es valido', numeric, required) },
        nombre: { required: helpers.withMessage('El nombre es requerido', required) },
        descripcion: { required: helpers.withMessage('La descripcion es requerida', required) },
        razon_social: { required: helpers.withMessage('La razon social es requerida', required) },
        nit: { required: helpers.withMessage('El NIT es requerido', required) }
    };
});

onMounted(() => {
    obtenerSociedades();
});

onBeforeMount(() => {
    initFilters();
});

const v$ = useVuelidate(reglas, sociedad);

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const obtenerSociedades = async () => {
    cargandoSociedades.value = true;
    await obtenerTodo('/sociedad/obtenerTodo')
        .then((response) => {
            sociedades.value = response.data;
        })
        .catch((error) => {
            console.log(error);
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener las sociedades' });
        })
        .finally(() => {
            cargandoSociedades.value = false;
        });
};

const crearSociedad = () => {
    sociedad.value = {};
    enviar.value = false;
    sociedadDialogo.value = true;
};

const editarSociedad = (s) => {
    sociedad.value = { ...s };
    sociedadDialogo.value = true;
};
const cerrarDialogo = () => {
    sociedadDialogo.value = false;
};
const guardarSociedad = async (isFormValid) => {
    enviar.value = true;
    if (!sociedad.value.id) {
        if (!isFormValid) {
            return;
        }
        guardandoSociedad.value = true;

        await crear('/sociedad/crear', sociedad.value, 'application/json')
            .then((response) => {
                console.log('funciona');
                toast.add({ severity: 'success', summary: 'Exito', detail: `${response}`, life: 3000 });
                sociedadDialogo.value = false;
                obtenerSociedades();
            })
            .catch((error) => {
                console.log(error);
                toast.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la sociedad' });
            })
            .finally(() => {
                guardandoSociedad.value = false;
            });
    } else {
        guardandoSociedad.value = true;
        await actualizar('/sociedad/actualizar', sociedad.value)
            .then((response) => {
                toast.add({ severity: 'success', summary: 'Exito', detail: `${response}` });
                sociedadDialogo.value = false;
                obtenerSociedades();
            })
            .catch((error) => {
                toast.add({ severity: 'error', summary: 'Error', detail: `${error}` });
            })
            .finally(() => {
                guardandoSociedad.value = false;
            });
    }
};
</script>

<style lang="scss" scoped></style>
