<template>
    <main class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button
                                label="Crear usuario"
                                icon="pi pi-plus"
                                class="p-button-success mr-2"
                                @click="nuevoUsuario"
                            />
                            <Button
                                label="Desactivar usuario"
                                icon="pi pi-times-circle"
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
                    :rows="5"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[3, 5, 25]"
                    currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords} usuarios"
                    responsiveLayout="scroll"
                    :loading="cargaTablaUsuarios"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Administración de usuarios</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="single" headerStyle="width: 3rem"></Column>
                    <Column field="name" header="Nombre" :sortable="true"></Column>
                    <Column field="email" header="Correo electronico"></Column>
                    <Column header="Roles">
                        <template #body="slotProps">
                            <Chip v-for="role in slotProps.data.roles" :key="role.id" class="m-1">
                                {{ role.name }}
                            </Chip>
                        </template>
                    </Column>
                    <Column field="active" header="Estado" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <Badge
                                :severity="slotProps.data.active ? 'success' : 'danger'"
                                :value="slotProps.data.active ? 'Activo' : 'Inactivo'"
                                size="small"
                                icon="pi pi-verified"
                            />
                        </template>
                    </Column>
                    <Column headerStyle="width:5%; min-width:5rem;">
                        <template #body="slotProps">
                            <Button
                                icon="pi pi-pencil"
                                class="p-button-rounded p-button-success p-mr-2"
                                @click="editarUsuario(slotProps.data)"
                            />
                        </template>
                    </Column>
                </DataTable>

                <Dialog
                    v-model:visible="userDialogo"
                    :style="{ width: '450px' }"
                    :header="usuario?.id ? 'Editar usuario' : 'Crear usuario'"
                    :modal="true"
                    class="p-fluid"
                >
                    <div class="field">
                        <label for="name" :class="{ 'p-error font-semibold': enviado && v$.name.$invalid }"
                            >Nombre Completo <span class="text-red-500">*</span></label
                        >
                        <InputText
                            id="nombre"
                            v-model.trim="usuario.name"
                            required="true"
                            autofocus
                            :class="{ 'p-invalid': enviado && v$.name.$invalid }"
                            placeholder="Pepito Perez"
                        />
                        <small v-if="enviado && v$.name.$invalid" class="p-error text-xs">
                            {{ v$.name.required.$message }}
                        </small>
                    </div>
                    <div class="field" :class="{ 'p-error font-semibold': enviado && v$.email.$invalid }">
                        <label for="email">Correo Electronico <span class="text-red-500">*</span></label>
                        <InputText
                            id="email"
                            v-model.trim="usuario.email"
                            required="true"
                            :class="{ 'p-invalid': enviado && v$.email.$invalid }"
                            placeholder="pepitoPerez@unico.com.co"
                        />
                        <!-- small con el error -->
                        <small v-if="enviado && v$.email.$invalid" class="p-error text-xs">
                            {{ v$.email.email.$message }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="phone">Celular </label>
                        <InputMask
                            id="phone"
                            v-model.trim="usuario.phone"
                            placeholder="(57) 300-000-00-00"
                            mask="(99) 999-999-99-99"
                        />
                    </div>
                    <div
                        v-if="!usuario?.id"
                        class="field"
                        :class="{ 'p-error font-semibold': enviado && v$.password.$invalid }"
                    >
                        <label for="contrasena">Contraseña <span class="text-red-500">*</span></label>
                        <Password
                            id="contrasena"
                            v-model.trim="usuario.password"
                            :class="{ 'p-invalid': enviado && !usuario.password }"
                            toggleMask
                            placeholder="contraseña"
                        />
                        <small v-if="enviado && v$.password.$invalid" class="p-error text-xs">
                            {{ v$.password.required.$message }}
                        </small>
                    </div>
                    <div
                        v-if="!usuario?.id"
                        class="field"
                        :class="{ 'p-error font-semibold': enviado && v$.password_confirmation.$invalid }"
                    >
                        <label for="confirmar">Confirmar contraseña <span class="text-red-500">*</span></label>
                        <Password
                            id="confirmar"
                            v-model.trim="usuario.password_confirmation"
                            :class="{ 'p-invalid': enviado && v$.password_confirmation.$invalid }"
                            toggleMask
                            placeholder="Confirmar contraseña"
                        />
                        <small v-if="enviado && v$.password_confirmation.$invalid" class="p-error text-xs">
                            {{ v$.password_confirmation.sameAsPassword.$message }}
                        </small>
                    </div>

                    <div class="field" :class="{ 'p-error font-semibold': enviado && v$.rol.$invalid }">
                        <label for="rol" class="mb-3">Rol<span class="text-red-500">*</span></label>
                        <MultiSelect
                            id="rol"
                            v-model="usuario.rol"
                            :options="roles"
                            required="true"
                            :class="{ 'p-invalid': enviado && v$.rol.$invalid }"
                            optionLabel="name"
                            optionValue="name"
                            placeholder="Seleccione un rol"
                        >
                        </MultiSelect>
                    </div>

                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button
                            label="Guardar"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="guardarUsuario(!v$.$invalid)"
                        />
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
                    header="Confirmacion desactivado"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="usuario">¿Está seguro de que desea desabilitar los usuarios seleccionados?</span>
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteProductsDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="desabilitarUsuarioSeleccionado"
                        />
                    </template>
                </Dialog>
            </div>
        </div>
    </main>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { obtenerTodo, crear } from '@/service/clienteHttp';
import { useVuelidate } from '@vuelidate/core';
import { required, email, sameAs, helpers } from '@vuelidate/validators';

const toast = useToast();
const products = ref(null);
const deleteProductsDialog = ref(false);
const cargaTablaUsuarios = ref(false);
const userDialogo = ref(false);
const borraUsuarioDialogo = ref(false);
const usuario = ref({});
const usuariosSeleccionados = ref(null);
const dt = ref(null);
const filters = ref({});
const enviado = ref(false);
const Usuarios = ref([]);
const roles = ref([]);

const reglas = computed(() => {
    return {
        name: { required: helpers.withMessage('El nombre es requerido', required) },
        email: {
            required: helpers.withMessage('El email es requerido', required),
            email: helpers.withMessage('El valor no es una dirección de correo electrónico válida', email)
        },
        password: { required: helpers.withMessage('La contraseña es requerida', required) },
        password_confirmation: {
            sameAsPassword: helpers.withMessage('Las contraseñas no coinciden', sameAs(usuario.value.password))
        },
        rol: { required: helpers.withMessage('El rol es requerido', required) }
    };
});

const { v$ } = useVuelidate(reglas, usuario);
onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    ObtenerUsuarios();
    ObtenerRoles();
});

const ObtenerUsuarios = async () => {
    cargaTablaUsuarios.value = true;
    const { data } = await obtenerTodo(`usuarios/obtenerTodos`);
    Usuarios.value = data;
    cargaTablaUsuarios.value = false;
};

const ObtenerRoles = async () => {
    const rolesObtenidos = await obtenerTodo(`roles/obtener`);
    roles.value = rolesObtenidos.roles;
};

const nuevoUsuario = () => {
    usuario.value = {};
    enviado.value = false;
    userDialogo.value = true;
};

const hideDialog = () => {
    userDialogo.value = false;
    enviado.value = false;
};

const guardarUsuario = async (isFormValid) => {
    enviado.value = true;
    if (usuario.value && !usuario.value.id) {
        // crea
        if (!isFormValid) {
            return;
        }
        await crear(`/auth/signup`, usuario.value, 'application/json') // aqui se envia el usuario
            .then((response) => {
                if (response.status === 201) {
                    asignarRol(response.data.data.id, usuario.value.rol);
                    toast.add({
                        severity: 'success',
                        summary: 'Usuario Creado',
                        detail: `Usuario ${response.data.data.name} creado`,
                        life: 3000
                    });
                    ObtenerUsuarios();
                    userDialogo.value = false;
                }
                if (response.status === 422) {
                    toast.add({
                        severity: 'error',
                        summary: 'Error al crear el usuario',
                        detail: `${response.data.message}`,
                        life: 3000
                    });
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
    } else {
        //edita
        console.log(usuario.value);
        await crear(`usuario/editar`, usuario.value, 'application/json')
            .then((response) => {
                if (response.status === 200) {
                    toast.add({
                        severity: 'success',
                        summary: 'Usuario Editado',
                        detail: `Usuario ${response.data.data.name} editado`,
                        life: 3000
                    });
                    if (usuario.value.rol) {
                        asignarRol(response.data.data.id, usuario.value.rol);
                    }
                    ObtenerUsuarios();
                    userDialogo.value = false;
                }
            })
            .catch((error) => {
                toast.add({
                    severity: 'error',
                    summary: 'Error al editar el usuario',
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

const editarUsuario = (editProduct) => {
    usuario.value = { ...editProduct };
    userDialogo.value = true;
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
const desabilitarUsuarioSeleccionado = () => {
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
