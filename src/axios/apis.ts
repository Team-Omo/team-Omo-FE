import axios from 'axios';

const apis = axios.create({ baseURL: import.meta.env.VITE_APP_SERVER_API_URL });

export default apis;