<template>
    <article class="card w-18rem h-auto p-3 mt-1">
        <div class="flex justify-content-between flex-wrap">
            <div>
                <p class="block text-500 font-medium text-2xl mb-1">
                    Semana {{ ciclo == 'final' ? 'proyectada' : '' }} {{ ciclo }} :
                    <span class="ml-2">{{ estadistica.semana }}</span>
                </p>
                <p class="text-600">Esperado</p>
                <p class="text-900 font-medium ml-2 text-4xl">{{ $formatoMonedaCOP(estadistica.esperado) }}</p>
            </div>
            <div
                class="flex align-items-center justify-content-center bg-orange-100 border-round"
                style="width: 4rem; height: 4rem"
            >
                <i class="pi pi-dollar text-orange-500 text-xl"></i>
            </div>
        </div>
        <p class="text-green-500 font-medium mt-2">
            %{{
                estadistica.esperado == 0 ? 0 : `${Math.round((estadistica.ejecutado / estadistica.esperado) * 100)}+`
            }}
        </p>
    </article>
</template>

<script setup>
defineProps({
    estadistica: {
        type: Object,
        required: true
    },
    ciclo: {
        type: String,
        required: true
    }
});
</script>

<style lang="scss" scoped></style>
