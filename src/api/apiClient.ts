import axios from 'axios';
import { API_URL } from '@env';

const apiClient = axios.create({
  baseURL: API_URL,
});

export const apiClientFetch = async <T>(url: string) => {
  try {
    const { data } = await apiClient.get<T>(url);
    return data;
  } catch (err) {
    throw err;
  }
};

export const apiClientDelete = async <T>(url: string) => {
  try {
    const { data } = await apiClient.delete<T>(url);
    return data;
  } catch (err) {
    throw err;
  }
};

export const apiClientPost = async <T>(url: string, payload: any) => {
  try {
    const { data } = await apiClient.post<T>(url, payload, { headers: {} });
    return data;
  } catch (err) {
    throw err;
  }
};

export const apiClientPut = async <T>(url: string, payload: any) => {
  try {
    const { data } = await apiClient.put<T>(url, payload, { headers: {} });
    return data;
  } catch (err) {
    throw err;
  }
};
