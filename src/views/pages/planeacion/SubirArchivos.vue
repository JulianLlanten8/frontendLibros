<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <h5>Espacio para subir archivos</h5>
                <div class="flex justify-content-between mb-3">
                    <Button class="bg-green-200" @click="datosPrueba()">datos de prueba</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const datosPrueba = () => {
    console.log('object');

}

</script>