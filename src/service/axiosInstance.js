/*----------------------------------------------------------------------------- 
 * Este archivo es el encargado de realizar las peticiones a la API,
 * para ello se utiliza la librería Axios y retona una instancia de
 * Axios con la configuración necesaria para realizar las peticiones a la API.
  -----------------------------------------------------------------------------
*/
import Axios from 'axios';

const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
        if (error?.response?.status === 401) {
            sessionStorage.removeItem('token');
            // window.location.href = '/';
        }
        if (error?.response?.status === 403) {
            sessionStorage.removeItem('token');
            // window.location.href = '/';
        }
        if (error?.response?.status === 404) {
            sessionStorage.removeItem('token');
            // window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axios;
