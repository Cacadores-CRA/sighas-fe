import { AffiliationResponse } from '@/@types/affiliations';
import { customInstance } from '@/api/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';

function getAffiliation(userId: string) {
  const affiliations = customInstance<AffiliationResponse[]>({
    url: `/affiliations/${userId}`,
    method: 'GET',
  });
  return affiliations;
}

export const useGetAffiliation = (userId: string, queryKeys?: string[]) =>
  useSuspenseQuery({
    queryKey: ['affiliation', userId, ...(queryKeys || [])],
    refetchIntervalInBackground: true,
    queryFn: () => getAffiliation(userId),
  });
