import axios from 'axios';

import { BASE_URL } from '~/contexts/system';

export function findAll() {
  return axios.get(`${BASE_URL}/relatorio`);
}

export function findDataAndProjeto(dataEscolhida: Date, projeto: number) {
  const formattedDate = dataEscolhida.toISOString().split('T')[0];
  return axios.get(`${BASE_URL}/relatorio/dataProjeto?data=${formattedDate}&projeto=${projeto}`);
}
export function findAndProjeto(projeto: number) {
  return axios.get(`${BASE_URL}/relatorio/projeto?projeto=${projeto}`);
}
export function findByDate(dataEscolhida: Date) {
  const formattedDate = dataEscolhida.toISOString().split('T')[0];
  return axios.get(`${BASE_URL}/relatorio/data?data=${formattedDate}`);
}
export function insert(RelatorioDTO: any) {
  return axios.post(`${BASE_URL}/relatorio`, RelatorioDTO);
}
export function findById(id: number) {
  return axios.get(`${BASE_URL}/relatorio/${id}`);
}
export function deleteRelatorio(id: number) {
  return axios.delete(`${BASE_URL}/relatorio/${id}`);
}
