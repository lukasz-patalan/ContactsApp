import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { apiClientPut } from './apiClient';
import { Contact } from './useContactsList';
interface EditContactsReposne {
  data: { message: string };
}

export const useEditContact = (
  contactId: string,
  userToUpdate: Omit<Contact, 'id'>,
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
