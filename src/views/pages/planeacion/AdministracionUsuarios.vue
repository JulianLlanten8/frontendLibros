<template>
    <main class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button
                                label="Crear Usuario"
                                icon="pi pi-plus"
                                class="p-button-success mr-2"
                                @click="openNew"
                            />
                            <Button
                                label="Eliminar Usuario"
                                icon="pi pi-trash"
                                class="p-button-danger"
                                @click="confirmDeleteSelected"
                                :disabled="!usuariosSeleccionados || !usuariosSeleccionados.length"
                            />
                        </div>
                    </template>

                    <template v-slot:end></template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="Usuarios"
                    v-model:selection="usuariosSeleccionados"
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
                            <h5 class="m-0">Administracion de usuarios</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="email" header="Correo electronico"></Column>
                    <Column header="Roles">
                        <template #body="slotProps">
                            <Chip v-for="role in slotProps.data.roles" :key="role.id"> {{ role.name }} </Chip>
                        </template>
                    </Column>
                    <Column field="active" header="Estado" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <Badge
                                :severity="!slotProps.active ? 'success' : 'danger'"
                                :value="!slotProps.active ? 'Activo' : 'Inactivo'"
                                size="large"
                                icon="pi pi-verified"
                            />
                        </template>
                    </Column>
                </DataTable>

                <Dialog
                    v-model:visible="userDialogo"
                    :style="{ width: '450px' }"
                    header="Creación de usuario"
                    :modal="true"
                    class="p-fluid"
                >
                    <div class="field">
                        <label for="name">Nombre Completo *</label>
                        <InputText
                            id="nombre"
                            v-model.trim="usuario.name"
                            required="true"
                            autofocus
                            :class="{ 'p-invalid': submitted && !usuario.name }"
                            placeholder="Pepito Perez"
                        />
                        <small class="p-invalid" v-if="submitted && !usuario.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="email">Correo Electronico *</label>
                        <InputText
                            id="email"
                            v-model.trim="usuario.email"
                            required="true"
                            :class="{ 'p-invalid': submitted && !usuario.description }"
                            placeholder="pepitoPerez@unico.com.co"
                        />
                    </div>
                    <div class="field">
                        <label for="contrasena">Contraseña *</label>
                        <Password
                            id="contrasena"
                            v-model.trim="usuario.password"
                            :class="{ 'p-invalid': submitted && !usuario.description }"
                            toggleMask
                            placeholder="contraseña"
                        />
                    </div>
                    <div class="field">
                        <label for="confirmar">Confirmar contraseña *</label>
                        <Password
                            id="confirmar"
                            v-model.trim="usuario.password_confirmation"
                            :class="{ 'p-invalid': submitted && !usuario.description }"
                            toggleMask
                            placeholder="Confirmar contraseña"
                        />
                    </div>

                    <div class="field">
                        <label for="rol" class="mb-3">Rol *</label>
                        <Dropdown
                            id="rol"
                            v-model="usuario.rol"
                            :options="roles"
                            required="true"
                            :class="{ 'p-invalid': submitted && !usuario.rol }"
                            optionLabel="name"
                            optionValue="name"
                            placeholder="Seleccione un rol"
                        >
                        </Dropdown>
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardarUsuario" />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="borraUsuarioDialogo"
                    :style="{ width: '450px' }"
                    header="Confirm"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="usuario"
                            >¿Estás seguro de que quieres borrar el usuario <b>{{ usuario.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="borraUsuarioDialogo = false"
                        />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="deleteProductsDialog"
                    :style="{ width: '450px' }"
                    header="Confirm"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="usuario">¿Está seguro de que desea eliminar los usuarios seleccionados?</span>
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteProductsDialog = false"
                        />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </main>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { obtenerTodo, crear } from '@/service/clienteHttp';

const toast = useToast();

const products = ref(null);
const userDialogo = ref(false);
const borraUsuarioDialogo = ref(false);
const deleteProductsDialog = ref(false);
const usuario = ref({});
const usuariosSeleccionados = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {
    ObtenerUsuarios();
    ObtenerRoles();
});

const Usuarios = ref([]);

const ObtenerUsuarios = async () => {
    const { data } = await obtenerTodo(`usuarios/obtenerTodos`);
    Usuarios.value = data;
};

const roles = ref([]);

const ObtenerRoles = async () => {
    const rolesObtenidos = await obtenerTodo(`roles/obtener`);
    roles.value = rolesObtenidos.roles;
};

const openNew = () => {
    usuario.value = {};
    submitted.value = false;
    userDialogo.value = true;
};

const hideDialog = () => {
    userDialogo.value = false;
    submitted.value = false;
};

const guardarUsuario = async () => {
    submitted.value = true;
    if (usuario.value) {
        await crear(`/auth/signup`, usuario.value, 'application/json') // aqui se envia el usuario
            .then((response) => {
                if (response.status === 201) {
                    asignarRol(response.data.data.id, usuario.value.rol);
                    toast.add({
                        severity: 'success',
                        summary: 'Usuario Creado',
                        detail: 'Usuario Creado',
                        life: 3000
                    });
                    ObtenerUsuarios();
                    userDialogo.value = false;
                }
            })
            .catch((error) => {
                toast.add({
                    severity: 'error',
                    summary: 'Error al crear el usuario',
                    detail: `${error}`,
                    life: 3000
                });
            });
    }
};

const asignarRol = async (id, rol) => {
    console.log(id);
    await crear(`usuario/asignarRolUsuario`, { id: id, roles: rol }, 'application/json')
        .then((response) => {
            if (response.status === 200) {
                toast.add({
                    severity: 'success',
                    summary: 'Rol Asignado',
                    detail: 'Rol Asignado',
                    life: 3000
                });
                userDialogo.value = false;
            }
        })
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error al asignar el rol',
                detail: `${error}`,
                life: 3000
            });
        });
};

const editProduct = (editProduct) => {
    usuario.value = { ...editProduct };
    console.log(usuario);
    userDialogo.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    usuario.value = editProduct;
    borraUsuarioDialogo.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== usuario.value.id);
    borraUsuarioDialogo.value = false;
    usuario.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !usuariosSeleccionados.value.includes(val));
    deleteProductsDialog.value = false;
    usuariosSeleccionados.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<style lang="scss" scoped></style>
