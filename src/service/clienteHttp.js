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
const obtenerTodo = async (RUTA) => {
    try {
        const respuesta = await axios.get(`${RUTA}`, {
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
 * Envía una solicitud POST para crear a la ruta especificada con los datos especificados y devuelve los datos de respuesta.
 * @param data - Los datos a enviar al servidor.
 * @param ruta {String} - La ruta de la api.
 * @param content {String} - El tipo de formato que se le envia ala api.
 * @returns {(Promise | Array )} Los datos de respuesta del servidor.
 */
const crear = async (RUTA, DATA, CONTENT = null) => {
    try {
        let user = sessionStorage.getItem('USER');

        DATA.id_user_log = JSON.parse(user).id;

        let token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;
        if (CONTENT == 'json') {
            const respuesta = await axios.post(`${RUTA}`, DATA, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null}`,
                    'Content-Type': 'application/json'
                }
            });
            return respuesta.statusText;
        }
        const respuesta = await axios.post(`${RUTA}`, DATA, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return respuesta.statusText;
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
        DATA.id_user_log = sessionStorage.getItem('id').id;
        const respuesta = await axios.put(`${RUTA}`, DATA, {
            headers: {
                Authorization: `Bearer 
                ${sessionStorage.getItem(JSON.parse('USER')) ? sessionStorage.getItem(JSON.parse('USER')) : null}`
            }
        });
        return respuesta.statusText;
    } catch (error) {
        return error.statusText;
    }
};

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

export { enviarDatos, obtenerPorId, obtenerTodo, crear, actualizar };
