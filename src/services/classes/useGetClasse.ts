import { GroupResponse } from '@/@types/groups';
import { customInstance } from '@/api/axiosInstance';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

function getClasse(id: string) {
  const classes = customInstance<GroupResponse>({
    url: `/groups/${id}`,
    method: 'GET',
  });
  return classes;
}

export const useGetClasse = (id: string) =>
  useQuery({
    queryKey: ['groups', id],
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    queryFn: () => getClasse(id),
  });
