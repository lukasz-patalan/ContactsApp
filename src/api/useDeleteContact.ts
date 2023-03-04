import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { apiClientDelete } from './apiClient';
interface DeleteContactsReposne {
  data: { message: string };
}

export const useDeleteContact = (
  contactId: string,
  options?: UseMutationOptions<DeleteContactsReposne, AxiosError, void, unknown>
) => {
  return useMutation<DeleteContactsReposne, AxiosError, void, unknown>(
    () => apiClientDelete(`users/${contactId}`),
    {
      ...options,
    }
  );
};
