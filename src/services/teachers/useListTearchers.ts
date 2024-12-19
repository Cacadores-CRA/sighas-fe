import { customInstance } from '@/api/axiosInstance';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type TeacherStatus = 'CREATED' | 'ACTIVE' | 'SUSPENDED' | 'FINISHED';

export interface TeacherDataType {
  userId: string;
  siape: string;
  name: string;
  surname: string;
  status: TeacherStatus;
  education: string;
  institutionalEmail: string;
  createdAt: string;
}

function teachersList(/*params: UsersListParams*/) {
  const teachers = customInstance<TeacherDataType[]>({
    url: `/professors`,
    method: 'GET',
  });
  return teachers;
}

export const useTeachersList = (
  /*params: UsersListParams,*/
  queryKeys?: string[]
) =>
  useQuery({
    queryKey: ['teachers', ...(queryKeys || [])],
    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    queryFn: () => teachersList(/*params*/),
  });
