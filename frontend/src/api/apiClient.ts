import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const apiClient = axios.create({
  // Use a porta que o seu dotnet run informou (5280 no seu último teste)
  baseURL: 'http://localhost:5280/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Feedback visual de carregamento (barra no topo)
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