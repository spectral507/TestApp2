import axios from 'axios';
import vm from './main';

const instance = axios.create({
    baseURL: '/api'
});

instance.interceptors.request.use(config => {
    vm.$Progress.start();
    return config;
});

instance.interceptors.response.use(
    response => {
        vm.$Progress.finish();
        return response;
    },
    error => {
        vm.$Progress.fail();
    });

export default instance;