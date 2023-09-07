import axios from 'axios';
import queryString from 'query-string';
import { VacancyInterface, VacancyGetQueryInterface } from 'interfaces/vacancy';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVacancies = async (query?: VacancyGetQueryInterface): Promise<PaginatedInterface<VacancyInterface>> => {
  const response = await axios.get('/api/vacancies', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createVacancy = async (vacancy: VacancyInterface) => {
  const response = await axios.post('/api/vacancies', vacancy);
  return response.data;
};

export const updateVacancyById = async (id: string, vacancy: VacancyInterface) => {
  const response = await axios.put(`/api/vacancies/${id}`, vacancy);
  return response.data;
};

export const getVacancyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/vacancies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVacancyById = async (id: string) => {
  const response = await axios.delete(`/api/vacancies/${id}`);
  return response.data;
};
