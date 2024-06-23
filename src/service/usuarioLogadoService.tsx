import axios, { AxiosRequestConfig } from 'axios';

import { getAccessToken } from '../service/authHelper'; // Importe a função para obter o token de acesso

import { BASE_URL } from '~/contexts/system';
import { requestBackend } from '~/models/request';

export async function findMe() {
  try {
    const token = await getAccessToken(); // Use await para obter o token de acesso

    if (!token) {
      throw new Error('Token de acesso não encontrado');
    }

    console.log('Token de acesso obtido:', token); // Log do token obtido

    const config: AxiosRequestConfig = {
      url: '/user/me',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return requestBackend(config);
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
}

export function update(credentialsDTO: any) {
  const { oldPassword, newPassword } = credentialsDTO;
  const url = `${BASE_URL}/user/me/password?oldPassword=${oldPassword}&newPassword=${newPassword}`;

  const token = getAccessToken(); // Obter o token de autenticação
  const headers = {
    Authorization: `Bearer ${token}`, // Incluir o token no cabeçalho da requisição
  };

  const config: AxiosRequestConfig = {
    method: 'put',
    url,
    data: credentialsDTO,
    headers,
  };

  return axios(config);
}
