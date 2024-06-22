import { AxiosRequestConfig, AxiosResponse } from 'axios';
import QueryString from 'qs';
import { CLIENT_ID, CLIENT_SECRET } from '../contexts/system';
import { CredentialsDTO } from '../models/auth';
import { requestBackend } from '../models/request';
import {
  getAccessToken,
  saveAccessToken,
  logout,
  getAccessTokenPayload,
  isAuthenticated,
  hasAnyRoles,
} from '../service/authHelper';

import { TokenResponse } from '~/models/token';

// Função para fazer a solicitação de login
export async function loginRequest(loginData: CredentialsDTO): Promise<TokenResponse> {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };
  const requestBody = QueryString.stringify({ ...loginData, grant_type: 'password' });

  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/oauth/token',
    data: requestBody,
    headers,
  };
  const response: AxiosResponse<TokenResponse> = await requestBackend(config);
  return response.data;
}

// Exportar as funções importadas de `authHelper`
export {
  getAccessToken,
  saveAccessToken,
  logout,
  getAccessTokenPayload,
  isAuthenticated,
  hasAnyRoles,
};
