import { AxiosRequestConfig } from 'axios';
import { getAccessToken } from '../service/authHelper'; // Importe a função para obter o token de acesso
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
export function update(credentialsDTO: { username: any; oldPassword: string; newPassword: string; }) {
    throw new Error("Function not implemented.");
}

