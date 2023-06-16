<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="libros"
                    v-model:selection="selectedProducts"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Administracion de libros</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="titulo" header="Titulo" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">titulo</span>
                            {{ slotProps.data.titulo }}
                        </template>
                    </Column>
                    <Column
                        field="descripcion"
                        header="Descripción"
                        :sortable="true"
                        headerStyle="width:20%; min-width:20rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">descripcion</span>
                            {{ slotProps.data.descripcion }}
                        </template>
                    </Column>
                    <Column header="Imagen" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Image</span>
                            <img :src="slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="autor" header="Autor" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">autor</span>
                            {{ slotProps.data.autor }}
                        </template>
                    </Column>
                    <Column field="genero" header="Genero" :sortable="true">
                        <template #body="slotProps">
                            <span class="p-column-title">Genero</span>
                            {{ slotProps.data.genero }}
                        </template>
                    </Column>
                    <Column
                        field="fecha_publicacion"
                        header="Fecha de publicacion"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">fecha_publicacion</span>
                            {{ slotProps.data.fecha_publicacion }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button
                                icon="pi pi-pencil"
                                class="p-button-rounded p-button-success mr-2"
                                @click="editProduct(slotProps.data)"
                            />
                            <Button
                                icon="pi pi-trash"
                                class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteProduct(slotProps.data)"
                            />
                        </template>
                    </Column>
                </DataTable>

                <Dialog
                    v-model:visible="libroDialog"
                    :style="{ width: '450px' }"
                    header="Informacio del nuevo Libro"
                    :modal="true"
                    class="p-fluid"
                >
                    <img
                        :src="contextPath + 'demo/images/libro/' + libro.image"
                        :alt="libro.image"
                        v-if="libro.image"
                        width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2"
                    />
                    <div class="field">
                        <label for="titulo">Titulo</label>
                        <InputText
                            id="titulo"
                            v-model.trim="libro.titulo"
                            required="true"
                            autofocus
                            :class="{ 'p-invalid': submitted && !libro.titulo }"
                        />
                        <small class="p-invalid" v-if="submitted && !libro.titulo">titulo is required.</small>
                    </div>
                    <div class="field">
                        <label for="autor">Autor </label>
                        <InputText
                            id="autor"
                            v-model.trim="libro.autor"
                            required="true"
                            :class="{ 'p-invalid': submitted && !libro.autor }"
                            placeholder="Escriba un autor"
                        />
                    </div>
                    <div class="field">
                        <label for="descripcion">Descripcion</label>
                        <Textarea
                            id="descripcion"
                            v-model.trim="libro.descripcion"
                            required="true"
                            rows="3"
                            cols="20"
                        />
                    </div>
                    <div class="field">
                        <label for="genero">Genero literario</label>
                        <InputText
                            id="genero"
                            v-model.trim="libro.genero"
                            required="true"
                            :class="{ 'p-invalid': submitted && !libro.genero }"
                            placeholder="Escriba un genero literario"
                        />
                    </div>
                    <div class="field">
                        <label for="isbn">Isbn</label>
                        <InputText
                            id="isbn"
                            v-model.trim="libro.isbn"
                            required="true"
                            :useGrouping="false"
                            :class="{ 'p-invalid': submitted && !libro.isbn }"
                            placeholder="32324342"
                        />
                    </div>
                    <div class="field">
                        <label for="editorial">Editorial</label>
                        <InputText
                            id="editorial"
                            v-model.trim="libro.editorial"
                            required="true"
                            :class="{ 'p-invalid': submitted && !libro.editorial }"
                            placeholder="Escriba un editorial literario"
                        />
                    </div>
                    <div class="field">
                        <label for="fecha_publicacion">Fecha de publicacion</label>
                        <Calendar
                            v-model="libro.fecha_publicacion"
                            showIcon
                            :class="{ 'p-invalid': submitted && !libro.fecha_publicacion }"
                        />
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="saveLibro"
                            loading-text="Guardando..."
                            :loading="submitted"
                        />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="deletelibroDialog"
                    :style="{ width: '450px' }"
                    header="Confirmar eliminacion"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="libro"
                            >¿Estás seguro de que quieres borrar <b>{{ libro.titulo }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deletelibroDialog = false"
                        />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteLibro" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deletelibrosDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="libro">Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deletelibrosDialog = false"
                        />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';

import { obtenerTodo, crear, actualizar, eliminar } from '@/service/clienteHttp.js';

import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';

const libros = ref([]);

const colleccionLibros = async () => {
    const respuesta = await obtenerTodo('libros', 'application/json');
    libros.value = JSON.parse(respuesta);
};
onMounted(() => {
    colleccionLibros();
});
const toast = useToast();
const { contextPath } = useLayout();

const libroDialog = ref(false);
const deletelibroDialog = ref(false);
const deletelibrosDialog = ref(false);
const libro = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

onBeforeMount(() => {
    initFilters();
});

const openNew = () => {
    libro.value = {};
    submitted.value = false;
    libroDialog.value = true;
};

const hideDialog = () => {
    libroDialog.value = false;
    submitted.value = false;
};

const editProduct = (editProduct) => {
    libro.value = { ...editProduct };
    libroDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    libro.value = editProduct;
    deletelibroDialog.value = true;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
const saveLibro = async () => {
    submitted.value = true;
    if (libro.value.titulo.trim() && libro.value.descripcion.trim() && libro.value.genero && libro.value.isbn) {
        if (libro.value.id) {
            //edita
            await actualizar(`libros/${libro.value.id}`, libro.value).then((res) => {
                if (res?.status === 200) {
                    colleccionLibros();
                    toast.add({ severity: 'success', summary: 'Exito', detail: 'Libro editado', life: 3000 });
                } else {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: `Up's no se ha podido editar el libro`,
                        life: 3000
                    });
                }
            });
        } else {
            //crea
            await crear('libros', libro.value, 'application/json').then((res) => {
                if (res?.status === 201) {
                    colleccionLibros();
                    toast.add({ severity: 'success', summary: 'Exito', detail: 'Libro creado', life: 3000 });
                } else {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: `Up's no se ha podido crear el libro`,
                        life: 3000
                    });
                }
            });
        }
        libroDialog.value = false;
        libro.value = {};
        submitted.value = false;
    }
};

const deleteLibro = async () => {
    await eliminar('libros', libro.value.id).then((res) => {
        if (res?.status === 204) {
            colleccionLibros();
            toast.add({ severity: 'success', summary: 'Exito', detail: 'Libro eliminado', life: 3000 });
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: `Up's no se ha podido eliminar el libro`,
                life: 3000
            });
        }
    });
    libro.value = {};
    deletelibroDialog.value = false;
};
</script>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
