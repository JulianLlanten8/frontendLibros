const formatoMonedaCOP = (valor) => {
    if (valor && valor > 0) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    }
};

export { formatoMonedaCOP };
