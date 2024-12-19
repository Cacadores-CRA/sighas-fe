import { customInstance } from '@/api/axiosInstance';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { UserDataType } from '@/types/Users/UserDataType.tsx';

// type UsersListParams = {
//   id: number;
// };

function usersList(/*params: UsersListParams*/) {
  const users = customInstance<UserDataType[]>({
    url: `/users`,
    method: 'GET',

    // params,
  });
  return users;
}

export const useUsersList = (
  /*params: UsersListParams,*/
  queryKeys: string[]
) =>
  useQuery({
    queryKey: ['users', ...queryKeys /*, params */],
    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    queryFn: () => usersList(/*params*/),
  });
