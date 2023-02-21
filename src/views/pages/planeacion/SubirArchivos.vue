<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Espacio para subir archivos</h5>
                <FileUpload
                    name="excel"
                    :customUpload="true"
                    @uploader="subirArchivo($event)"
                    @upload="onUpload"
                    :multiple="true"
                    :accept="'application/vnd.ms-excel, .csv'"
                    :maxFileSize="1000000"
                    invalidFileSizeMessage="El tamaño del archivo es demasiado grande"
                    chooseLabel="Seleccionar"
                    uploadLabel="Subir"
                    cancelLabel="Cancelar"
                    invalidFileTypeMessage="El tipo de archivo no es válido"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { crear } from '@/service/clienteHttp';

const toast = useToast();

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const subirArchivo = async (event) => {
    let archivo = event.files[0];
    await crear('/archivos/crear', { archivo: archivo }, 'multipart/form-data')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error);
        });
};
</script>
