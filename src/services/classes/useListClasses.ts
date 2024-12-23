import { GroupResponse } from '@/@types/groups';
import { customInstance } from '@/api/axiosInstance';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

function classesList() {
  const classes = customInstance<GroupResponse[]>({
    url: `/groups`,
    method: 'GET',
  });
  return classes;
}

export const useClassesList = (queryKeys?: string[]) =>
  useQuery({
    queryKey: ['groups', ...(queryKeys || [])],
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    queryFn: () => classesList(),
  });
