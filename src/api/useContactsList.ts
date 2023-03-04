import { apiClientFetch } from './apiClient';
import { useQuery } from 'react-query';

export interface Contact {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const getContactsList = async () =>
  await apiClientFetch<Contact[]>('users');

export const useContactsList = () => {
  return useQuery('contactsList', () => apiClientFetch<Contact[]>('users'));
};
