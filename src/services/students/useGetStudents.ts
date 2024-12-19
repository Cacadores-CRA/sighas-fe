import { customInstance } from '@/api/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface StudentDataType {
  userId: string;
  name: string;
  status: 'CREATED' | 'ACTIVE' | 'SUSPENDED' | 'FINISHED';
  enrollment: string;
  institutionalEmail: string;
  createdAt: string;
}
function getStudent(userId: string) {
  const students = customInstance<StudentDataType>({
    url: `/students/enrollment/${userId}`,
    method: 'GET',
  });
  return students;
}

export const useGetStudents = (enrollment: string, queryKeys?: string[]) =>
  useSuspenseQuery({
    queryKey: ['students', enrollment, ...(queryKeys || [])],
    refetchIntervalInBackground: true,
    queryFn: () => getStudent(enrollment),
  });
