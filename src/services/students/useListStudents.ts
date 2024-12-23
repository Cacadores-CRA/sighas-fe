import { customInstance } from '@/api/axiosInstance';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { StudentDataType } from './useGetStudents';

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

function studentsList(/*params: UsersListParams*/) {
  const students = customInstance<StudentDataType[]>({
    url: `/students`,
    method: 'GET',
  });
  return students;
}

export const useListStudents = (
  /*params: UsersListParams,*/
  queryKeys?: string[]
) =>
  useQuery({
    queryKey: ['students', ...(queryKeys || [])],
    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    queryFn: () => studentsList(/*params*/),
  });
