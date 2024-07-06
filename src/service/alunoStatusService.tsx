import axios from 'axios';

import { BASE_URL } from '~/contexts/system';


export function findAll() {
  return axios.get(`${BASE_URL}/status`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/status/${id}`);
}
export function insertAluno(alunoStatus: any) {
  return axios.post(`${BASE_URL}/status`, alunoStatus);
}

export function deleteAluno(id: number) {
  return axios.delete(`${BASE_URL}/status/${id}`);
}



