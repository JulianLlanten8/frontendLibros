<template>
    <article class="card w-20rem h-12rem pt-2 mt-1">
        <div class="flex justify-content-between flex-wrap">
            <div>
                <p class="block text-500 font-medium mb-1">
                    {{ estadistica.descripcion }}
                </p>
                <p class="text-500 mb-0">Saldo esperado</p>
                <p class="text-900 font-medium text-xl">{{ $formatoMonedaCOP(estadistica.esperado) }}</p>
            </div>
            <div
                class="flex align-items-center justify-content-center bg-orange-100 border-round"
                style="width: 2.5rem; height: 2.5rem"
            >
                <i class="pi pi-dollar text-orange-500 text-xl"></i>
            </div>
            <div>
                <p class="text-500 mb-0">Saldo ejecutado</p>
                <p class="text-900 font-medium text-xl">{{ $formatoMonedaCOP(estadistica.ejecutado) }}</p>
            </div>
        </div>
        <p class="text-green-500 font-medium">
            %{{
                estadistica.esperado == 0 ? 0 : `${Math.round((estadistica.ejecutado / estadistica.esperado) * 100)}+`
            }}
        </p>
    </article>
</template>
<script setup>
// import { defineProps } from 'vue';

defineProps({
    estadistica: {
        type: Object,
        required: true
    }
});
</script>
