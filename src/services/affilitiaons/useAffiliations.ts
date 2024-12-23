import { AffiliationResponse } from '@/@types/affiliations';
import { customInstance } from '@/api/axiosInstance';
import { useSuspenseQuery } from '@tanstack/react-query';

function listAffiliations() {
  const affiliations = customInstance<AffiliationResponse[]>({
    url: `/affiliations`,
    method: 'GET',
  });
  return affiliations;
}

export const useListAffiliations = (queryKeys?: string[]) =>
  useSuspenseQuery({
    queryKey: ['affiliations', ...(queryKeys || [])],
    refetchIntervalInBackground: true,
    queryFn: () => listAffiliations(),
  });
