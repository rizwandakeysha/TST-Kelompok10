import axios from 'axios';

const API = axios.create({
    baseURL: 'https://e39b-103-159-96-125.ngrok-free.app', // URL ngrok
    headers: { "ngrok-skip-browser-warning": "true" }, // Menambahkan header jika diperlukan
});

export default API;