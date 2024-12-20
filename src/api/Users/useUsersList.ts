import { customInstance } from '@/api/axiosInstance';
import { UserDataType } from '@/services/users/useListUsers';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

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
