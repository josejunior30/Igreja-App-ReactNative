import { AccessTokenPayloadDTO, RoleEnum } from '../models/auth';
const jwtDecode = require('jwt-decode');
import * as accessTokenRepository from '../localStorage/access-token-repository';

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

// Função para fazer logout removendo o token
export function logout() {
  accessTokenRepository.remove();
}
