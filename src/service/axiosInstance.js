/*----------------------------------------------------------------------------- 
 * Este archivo es el encargado de realizar las peticiones a la API,
 * para ello se utiliza la librería Axios y retona una instancia de
 * Axios con la configuración necesaria para realizar las peticiones a la API.
  -----------------------------------------------------------------------------
*/
import Axios from 'axios';

const axios = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
