<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Espacio para subir archivos</h5>
                <FileUpload name="demo[]" url="./upload.php" @upload="onUpload" :multiple="true" accept="image/*"
                    :maxFileSize="1000000" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
</script>