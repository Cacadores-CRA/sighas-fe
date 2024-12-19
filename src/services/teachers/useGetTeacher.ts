import { customInstance } from '@/api/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';

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

function getTeacher(userId: string) {
  const teachers = customInstance<TeacherDataType[]>({
    url: `/professors/${userId}`,
    method: 'GET',
  });
  return teachers;
}

export const useGetTeacher = (userId: string, queryKeys?: string[]) =>
  useSuspenseQuery({
    queryKey: ['teachers', userId, ...(queryKeys || [])],
    refetchIntervalInBackground: true,
    queryFn: () => getTeacher(userId),
  });
