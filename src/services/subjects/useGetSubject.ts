import { SubjectResponse } from '@/@types/subjects';
import { customInstance } from '@/api/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';

function getSubject(subjectId: string) {
  const subject = customInstance<SubjectResponse[]>({
    url: `/subjects/${subjectId}`,
    method: 'GET',
  });
  return subject;
}

export const useGetSubject = (subjectId: string, queryKeys?: string[]) =>
  useSuspenseQuery({
    queryKey: ['subject', subjectId, ...(queryKeys || [])],
    refetchIntervalInBackground: true,
    queryFn: () => getSubject(subjectId),
  });
