import { customInstance } from '@/api/axiosInstance';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type TeacherStatus = 'CREATED' | 'ACTIVE' | 'SUSPENDED' | 'FINISHED';

export interface UserDataType {
  id: string;
  cpf: string;
  name: string;
  surname: string;
  birthdate: string;
  email: string;
  roles: string[];
  createdAt: string;
}

function userList(/*params: UsersListParams*/) {
  const users = customInstance<UserDataType[]>({
    url: `/users`,
    method: 'GET',
  });
  return users;
}

export const useUsersList = (
  /*params: UsersListParams,*/
  queryKeys?: string[]
) =>
  useQuery({
    queryKey: ['users', ...(queryKeys || [])],
    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    queryFn: () => userList(/*params*/),
  });
