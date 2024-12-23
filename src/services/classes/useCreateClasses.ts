import { GroupPayload } from '@/@types/groups';
import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateClasses = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GroupPayload) => {
      const response = await customInstance<GroupPayload>({
        url: `/groups`,
        method: 'POST',
        data,
      });
      return response;
    },
    onSuccess: () => {
      // Invalidate the query to refetch data
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};
