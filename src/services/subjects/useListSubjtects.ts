import { SubjectResponse } from '@/@types/subjects';
import { customInstance } from '@/api/axiosInstance';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

function listSubjects() {
  const subjects = customInstance<SubjectResponse[]>({
    url: `/subjects`,
    method: 'GET',
  });
  return subjects;
}

export const useListSubjects = (queryKeys?: string[]) =>
  useQuery({
    queryKey: ['subjects', ...(queryKeys || [])],
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    queryFn: () => listSubjects(),
  });
