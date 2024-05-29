

import { AxiosRequestConfig, AxiosResponse } from 'axios';

import QueryString from 'qs';

import { CLIENT_ID, CLIENT_SECRET } from '../contexts/system';
import * as accessTokenRepository from '../localStorage/access-token-repository';
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from '../models/auth';
import { requestBackend } from '../models/request';


export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
}

const jwtDecode = require('jwt-decode');
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









// Função para fazer logout removendo o token
export function logout() {
  accessTokenRepository.remove();
}

// Função para salvar o token de acesso
export function saveAccessToken(token: string) {
  accessTokenRepository.save(token);
}

// Função para obter o token de acesso
export function getAccessToken() {
  return accessTokenRepository.get();
}

// Função para obter o payload do token de acesso decodificado
export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
  try {
    const token = accessTokenRepository.get();
    return token == null ? undefined : (jwtDecode(token) as AccessTokenPayloadDTO);
  } catch (error) {
    return undefined;
  }
}

// Função para verificar se o usuário está autenticado
export function isAuthenticated(): boolean {
  const tokenPayload = getAccessTokenPayload();
  return tokenPayload !== undefined && tokenPayload.exp * 1000 > Date.now();
}

// Função para verificar se o usuário possui algum dos roles especificados
export function hasAnyRoles(roles: RoleEnum[]): boolean {
  if (roles.length === 0) {
    return true;
  }
  const tokenPayload = getAccessTokenPayload();
  if (tokenPayload !== undefined) {
    return roles.some((role) => tokenPayload.authorities.includes(role));
  }
  return false;
}
