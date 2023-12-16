import axios from 'axios';

const IP = '192.168.198.106'
export const axiosInstance = axios.create({ baseURL: `http://${IP}:8080/` });