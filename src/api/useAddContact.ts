import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { apiClientPost } from './apiClient';
import { Contact } from './useContactsList';
interface AddContactResponse {
  data: Contact;
}

export const useAddContact = (
  newUser: Omit<Contact, 'id'>,
  options?: UseMutationOptions<
    AddContactResponse,
    AxiosError<{ message?: string }, any>,
    void,
    unknown
  >
) => {
  return useMutation<
    AddContactResponse,
    AxiosError<{ message?: string }, any>,
    void,
    unknown
  >(() => apiClientPost('users', newUser), {
    ...options,
  });
};
