import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const apiClient = axios.create({
  // Sem localhost, sem porta. Apenas a rota relativa.
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response;
  },
  (error) => {
    nprogress.done();
    return Promise.reject(error);
  }
);

export default apiClient;