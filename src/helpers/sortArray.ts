import { Contact } from '../api/useContactsList';

export const getSortedArray = (array?: Contact[]) => {
  return array?.length
    ? [...array]?.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    : [];
};
