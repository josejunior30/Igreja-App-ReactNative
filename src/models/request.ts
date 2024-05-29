import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../contexts/system';
import { getAccessToken } from '../service/authHelper';

export function requestBackend(config: AxiosRequestConfig) {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAccessToken(),
      }
    : config.headers;
  return axios({ ...config, baseURL: BASE_URL, headers });
}

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      console.log('deu erro');
    }
    return Promise.reject(error);
  }
);
