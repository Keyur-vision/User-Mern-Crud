import axios from "axios";

export const initialApi = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL,
});

initialApi.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token')); // Retrieve your token from local storage or context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default initialApi;