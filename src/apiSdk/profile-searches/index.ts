import axios from 'axios';
import queryString from 'query-string';
import { ProfileSearchInterface, ProfileSearchGetQueryInterface } from 'interfaces/profile-search';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProfileSearches = async (
  query?: ProfileSearchGetQueryInterface,
): Promise<PaginatedInterface<ProfileSearchInterface>> => {
  const response = await axios.get('/api/profile-searches', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createProfileSearch = async (profileSearch: ProfileSearchInterface) => {
  const response = await axios.post('/api/profile-searches', profileSearch);
  return response.data;
};

export const updateProfileSearchById = async (id: string, profileSearch: ProfileSearchInterface) => {
  const response = await axios.put(`/api/profile-searches/${id}`, profileSearch);
  return response.data;
};

export const getProfileSearchById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/profile-searches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProfileSearchById = async (id: string) => {
  const response = await axios.delete(`/api/profile-searches/${id}`);
  return response.data;
};
