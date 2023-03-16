<template>
    <div class="grid">
        <Toast />
        <div class="col-12">
            <div class="card">
                <h5>Espacio para subir archivos</h5>
                <Dropdown
                    v-model="sociedad"
                    :options="sociedades"
                    :loading="cargandoSociedades"
                    optionValue="nombre"
                    optionLabel="nombre"
                    placeholder="Seleccione una sociedad"
                    class="my-3 w-full"
                    @change="unblockBlock"
                    :showClear="true"
                />
                <ProgressBar mode="indeterminate" style="height: 0.5em" v-if="cargando" />
                <BlockUI :blocked="bloqueado">
                    <FileUpload
                        name="Excel"
                        :customUpload="true"
                        @uploader="subirArchivo($event)"
                        @upload="onUpload"
                        :multiple="true"
                        :accept="'application/vnd.ms-excel, .csv, .xls,.xlsx'"
                        :maxFileSize="1000000"
                        invalidFileSizeMessage="El tamaño del archivo es demasiado grande"
                        chooseLabel="Seleccionar"
                        uploadLabel="Subir"
                        cancelLabel="Cancelar"
                        invalidFileTypeMessage="El tipo de archivo no es válido"
                    />
                </BlockUI>
            </div>
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

const toast = useToast();
const unblockBlock = () => {
    if (sociedad.value) {
        bloqueado.value = false;
    } else {
        bloqueado.value = true;
    }
};
const bloqueado = ref(true);

const sociedad = ref({
    codigo: 0,
    nit: '',
    nombre: ''
});

const cargandoSociedades = ref(false);

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
const subirArchivo = async (event) => {
    let archivo = event.files[0];
    cargando.value = true;
    const subidaArchivo = await crear(
        '/archivos/crear/',
        { archivo: archivo, asociacion: sociedad.value.nombre },
        'multipart/form-data'
    );

    if (subidaArchivo.status == 200) {
        toast.add({ severity: 'Success', summary: 'Success', detail: 'Archivo subido correctamente', life: 3000 });
        cargando.value = false;
    } else {
        toast.add({
            severity: 'Error',
            summary: 'Error',
            detail: 'Ups! algo salio mal al subir el archivo',
            life: 3000
        });
        cargando.value = false;
    }
};
</script>
