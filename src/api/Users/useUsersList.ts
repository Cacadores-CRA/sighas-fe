import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { UserDataType } from '@/types/Users/UserDataType.tsx';

import { customInstance } from '../../../axiosInstance.ts';

// type UsersListParams = {
//   id: number;
// };

function usersList(/*params: UsersListParams*/) {
  const users = customInstance<UserDataType[]>({
    url: `/v1/users`,
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
