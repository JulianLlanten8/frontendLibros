<template>
    <div class="grid">
        <Toast />
        <div class="col-12">
            <Card>
                <template #title>
                    <h4>Subir archivos</h4>
                </template>
                <template #content>
                    <div class="flex flex-column md:flex-row gap-3">
                        <div class="p-inputgroup flex-1">
                            <Dropdown
                                v-model="tipo"
                                :options="tiposArchivos"
                                optionLabel="nombre"
                                placeholder="Selecione el tipo de archivo"
                                class="my-3 w-full"
                                @change="validarTipoArchivo()"
                                :showClear="true"
                            />
                        </div>
                        <div class="p-inputgroup flex-1">
                            <Dropdown
                                v-model="sociedad"
                                :options="sociedades"
                                :loading="cargandoSociedades"
                                optionValue="nombre"
                                optionLabel="nombre"
                                placeholder="Seleccione una sociedad"
                                class="my-3 w-full"
                                @change="obtenerSemanas(sociedad)"
                                :showClear="true"
                            />
                        </div>
                        <div class="p-inputgroup flex-1">
                            <Dropdown
                                v-if="visible"
                                v-model="semana"
                                :options="semanas"
                                optionLabel="semana"
                                optionValue="semana"
                                placeholder="Seleccione una semana"
                                class="my-3 w-full"
                                :showClear="true"
                                @change="validarBloqueo()"
                            />
                        </div>
                    </div>
                </template>
                <template #footer>
                    <ProgressBar mode="indeterminate" style="height: 0.5em" v-if="cargando" />
                    <FileUpload
                        name="Excel"
                        :customUpload="true"
                        @uploader="subirArchivo($event)"
                        @upload="onUpload"
                        :multiple="true"
                        :disabled="bloqueado"
                        :accept="'application/vnd.ms-excel, .csv, .xls,.xlsx'"
                        :maxFileSize="1000000"
                        invalidFileSizeMessage="El tamaño del archivo es demasiado grande"
                        chooseLabel="Seleccionar"
                        uploadLabel="Subir"
                        cancelLabel="Cancelar"
                        invalidFileTypeMessage="El tipo de archivo no es válido"
                    />
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { crear, obtenerTodo } from '@/service/clienteHttp';

onMounted(async () => {
    obtenerSociedades();
});

const tipo = ref('');
const tiposArchivos = ref([
    { nombre: 'Esperado' },
    { nombre: 'Ejecutado - Egresos' },
    { nombre: 'Ejecutado - Ingresos' }
]);
const visible = ref(false);

const validarTipoArchivo = () => {
    validarBloqueo();
    tipo.value.nombre != 'Esperado' ? (visible.value = true) : (visible.value = false);
};

const semana = ref('');
const semanas = ref([]);

const toast = useToast();

const bloqueado = ref(true);

const sociedad = ref({
    codigo: 0,
    nit: '',
    nombre: ''
});

const validarBloqueo = () => {
    if (tipo.value.nombre == 'Esperado' && sociedad.value.nombre != '') {
        bloqueado.value = false;
    } else if (tipo.value.nombre != 'Esperado' && sociedad.value.nombre != '' && semana.value != '') {
        bloqueado.value = false;
    } else {
        bloqueado.value = true;
    }
};

const cargandoSociedades = ref(false);
const obtenerSemanas = async (sociedad) => {
    cargandoSociedades.value = true;
    semana.value = '';
    validarBloqueo();

    await obtenerTodo(`/flujoCaja/semanas/${sociedad}`)
        .then((res) => {
            semanas.value = res.data;
        })
        .catch((err) => {
            toast.add({
                severity: 'danger',
                summary: 'Ups! algo salio mal al obtener las sociedades error:',
                detail: `${err}`,
                life: 5000
            });
        })
        .finally(() => {
            cargandoSociedades.value = false;
        });
};

const obtenerSociedades = async () => {
    cargandoSociedades.value = true;
    await obtenerTodo('sociedad/obtenerTodo')
        .then((res) => {
            sociedades.value = res.data;
        })
        .catch((err) => {
            toast.add({
                severity: 'danger',
                summary: 'Error',
                detail: `Ups! algo salio mal al obtener las sociedades error: ${err}`,
                life: 5000
            });
        })
        .finally(() => {
            cargandoSociedades.value = false;
        });
};
const sociedades = ref([]);

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const cargando = ref(false);
let subidaArchivo = null;
const subirArchivo = async (event) => {
    let archivo = event.files[0];
    cargando.value = true;
    switch (tipo.value.nombre) {
        case 'Esperado':
            subidaArchivo = await crear(
                '/esperado/subir',
                { archivo: archivo, sociedad: sociedad.value },
                'multipart/form-data'
            );
            break;
        case 'Ejecutado - Egresos':
            subidaArchivo = await crear(
                '/esperado/subirEgresos',
                { archivo: archivo, sociedad: sociedad.value, semana: semana.value },
                'multipart/form-data'
            );
            break;
        case 'Ejecutado - Ingresos':
            subidaArchivo = await crear(
                '/esperado/subirIngresos',
                { archivo: archivo, semana: semana.value },
                'multipart/form-data'
            );
            break;
        default:
            break;
    }
    if (subidaArchivo.status === 201) {
        toast.add({
            severity: 'success',
            summary: 'Archivo subido correctamente',
            detail: `${subidaArchivo.data.message}`,
            closable: true
        });
        cargando.value = false;
    } else {
        toast.add({
            severity: 'warn',
            summary: 'Ups! algo salio mal al subir el archivo',
            detail: `${subidaArchivo.data.error}`,
            closable: true
        });
        cargando.value = false;
    }
};
</script>
