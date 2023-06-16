import axios from './axiosInstance.js';
/**
 * Realiza una solicitud GET a la ruta especificada, pasa la identificación como parámetro y devuelve los datos de respuesta
 * @param ruta {String} - La ruta a la que quieres acceder.
 * @param id {number} - El id del artículo que desea obtener.
 * @returns {(Promise  | JSON)} Los datos de respuesta por id.
 */

const obtenerPorId = async (RUTA, ID) => {
    try {
        const respuesta = await axios.get(`${RUTA}/${ID}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null}`
            }
        });
        return respuesta.data;
    } catch (error) {
        return error.statusText;
    }
};
/**
 * Hace una solicitud GET a la ruta especificada y devuelve los datos de la respuesta
 * @param ruta {String} - La ruta a la API.
 * @returns {(Promise  | JSON)} Los datos de la respuesta.
 */
const obtenerTodo = async (RUTA, Type = null) => {
    try {
        const respuesta = await axios.get(`${RUTA}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null}`
            },
            responseType: Type
        });
        return respuesta.data;
    } catch (error) {
        return error.statusText;
    }
};
/**
 * Envía una solicitud POST para crear a la ruta especificada con los datos especificados y devuelve los datos de respuesta.
 * @param data - Los datos a enviar al servidor.
 * @param ruta {String} - La ruta de la api.
 * @param content {String} - El tipo de formato que se le envia ala api.
 * @returns {(Promise | Array )} Los datos de respuesta del servidor.
 */
const crear = async (RUTA, DATA, CONTENT = null) => {
    try {
        const respuesta = await axios.post(`${RUTA}`, DATA, {
            headers: {
                'Content-Type': CONTENT
            }
        });
        return respuesta;
    } catch (error) {
        return error;
    }
};
/**
 * Envía una solicitud PUT al servidor con los datos y la ruta pasada como parámetros.
 * @param ruta {String} - La ruta de la api.
 * @param data - Los datos a enviar al servidor..
 * @returns  {(Promise | Array )} Los datos de respuesta del servidor.
 */
const actualizar = async (RUTA, DATA) => {
    try {
        const respuesta = await axios.put(`${RUTA}`, DATA, {
            headers: {}
        });
        return respuesta;
    } catch (error) {
        return error;
    }
};

const eliminar = async (RUTA, ID) => {
    try {
        const respuesta = await axios.delete(`${RUTA}/${ID}`, {
            headers: {}
        });
        return respuesta;
    } catch (error) {
        return error;
    }
};

/**
 * Esta es una función asíncrona llamada "enviarDatos" que toma dos parámetros, "RUTA" y "DATA".
 * @param RUTA - RUTA es un parámetro de cadena que representa la URL o punto final donde se enviarán
 * los datos. Por lo general, se usa en solicitudes HTTP para especificar la ubicación del recurso al
 * que se accede o se modifica.
 * @param DATA - El parámetro `DATA` es un objeto que contiene la información que debe enviarse al
 * servidor. Podría ser cualquier tipo de datos, como una cadena, un número, una matriz u otro objeto.
 * El formato y la estructura de los datos dependerán de los requisitos específicos del extremo del
 * servidor que está utilizando.
 */
const enviarDatos = async (RUTA, DATA) => {
    try {
        const respuesta = await axios.post(`${RUTA}`, DATA, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null}`,
                'Content-Type': 'application/json'
            }
        });
        return respuesta.data;
    } catch (error) {
        return error.response;
    }
};

export { enviarDatos, obtenerPorId, obtenerTodo, crear, actualizar, eliminar };
