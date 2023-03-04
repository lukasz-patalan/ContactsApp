import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { apiClientPut } from './apiClient';
interface EditContactsReposne {
  data: any;
}

export const useEditContact = (
  contactId: number,
  userToUpdate: any,
  options?: UseMutationOptions<
    EditContactsReposne,
    AxiosError<{ message?: string }, any>,
    void,
    unknown
  >
) => {
  return useMutation<
    EditContactsReposne,
    AxiosError<{ message?: string }, any>,
    void,
    unknown
  >(() => apiClientPut(`users/${contactId}`, userToUpdate), {
    ...options,
  });
};
