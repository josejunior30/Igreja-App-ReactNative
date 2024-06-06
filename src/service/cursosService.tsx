import axios from 'axios';

import { BASE_URL } from '~/contexts/system';

export function findAll() {
  return axios.get(`${BASE_URL}/projetos`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/projetos/${id}`);
}
