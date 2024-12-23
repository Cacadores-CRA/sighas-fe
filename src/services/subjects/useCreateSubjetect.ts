import { SubjectPayload, SubjectResponse } from '@/@types/subjects';
import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SubjectPayload) => {
      const response = await customInstance<SubjectResponse>({
        url: `/subjects`,
        method: 'POST',
        data,
      });
      return response;
    },
    onSuccess: () => {
      // Invalidate the query to refetch data
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};
