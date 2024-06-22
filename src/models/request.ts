import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../contexts/system';
import { getAccessToken } from '../service/authHelper';

// Função para configurar o header com o token de acesso
const setupRequestInterceptor = async () => {
  axios.interceptors.request.use(
    async (config) => {
      const accessToken = await getAccessToken(); // Obter token de acesso de forma assíncrona
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Configurar o interceptor assim que o módulo for carregado
setupRequestInterceptor();

// Função para realizar a requisição ao backend
export function requestBackend(config: AxiosRequestConfig) {
  return axios({ ...config, baseURL: BASE_URL });
}

// Interceptores globais de erro
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      console.log('Erro 401: Não autorizado');
      // Tratar aqui de acordo com a lógica da sua aplicação, como redirecionar para a tela de login
    }
    return Promise.reject(error);
  }
);

