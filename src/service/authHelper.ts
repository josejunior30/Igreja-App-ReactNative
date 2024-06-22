import {jwtDecode} from 'jwt-decode';
import * as accessTokenRepository from '../localStorage/access-token-repository';
import { AccessTokenPayloadDTO, RoleEnum } from '../models/auth';

// Função para salvar o token de acesso
export function saveAccessToken(token: string) {
  accessTokenRepository.save(token);
  console.log('Token salvo:', token);
}

// Função para obter o token de acesso de forma assíncrona
export async function getAccessToken(): Promise<string | null> {
  try {
    const token = await accessTokenRepository.get();
    console.log('Token recuperado:', token);
    return token;
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    throw error;
  }
}

// Função para obter o payload do token de acesso decodificado
export async function getAccessTokenPayload(): Promise<AccessTokenPayloadDTO | null> {
  try {
    const token = await getAccessToken(); // Use await para obter o token
    if (!token) {
      return null; // Se o token não existir, retorna null
    }
    const decodedToken = jwtDecode<AccessTokenPayloadDTO>(token);
    return decodedToken;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null; // Em caso de erro, retorna null
  }
}

// Função para verificar se o usuário está autenticado
export async function isAuthenticated(): Promise<boolean> {
  const tokenPayload = await getAccessTokenPayload();
  return tokenPayload !== null && tokenPayload.exp * 1000 > Date.now();
}

// Função para verificar se o usuário possui algum dos papéis especificados
export async function hasAnyRoles(roles: RoleEnum[]): Promise<boolean> {
  if (roles.length === 0) {
    return true;
  }
  const tokenPayload = await getAccessTokenPayload();
  if (tokenPayload !== null) {
    return roles.some((role) => tokenPayload.authorities.includes(role));
  }
  return false;
}

// Função para fazer logout removendo o token
export function logout() {
  accessTokenRepository.remove();
}
