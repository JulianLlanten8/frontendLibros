const formatoMonedaCOP = (valor) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor);
};
const formatoFecha = (fecha) => {
    const date = new Date(fecha);
    return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};
export { formatoMonedaCOP, formatoFecha };
