import axios from 'axios';

// Força a leitura da URL do Render injetada pela Vercel
const envUrl = import.meta.env.VITE_API_URL;

// Se a variável existir, usa ela. Se não (local), usa o proxy '/api'
const baseURL = envUrl ? `${envUrl.replace(/\/$/, '')}/api` : '/api';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log temporário para você ver no F12 do navegador para onde ele está apontando
console.log("Axios conectado em: ", baseURL);

export default apiClient;