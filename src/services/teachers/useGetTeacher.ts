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

function getTeacher(siape: string) {
  const teachers = customInstance<TeacherDataType>({
    url: `/professors/siape/${siape}`,
    method: 'GET',
  });
  return teachers;
}

export const useGetTeacher = (siape: string, queryKeys?: string[]) =>
  useSuspenseQuery({
    queryKey: ['teachers', siape, ...(queryKeys || [])],
    refetchIntervalInBackground: true,
    queryFn: () => getTeacher(siape),
  });
