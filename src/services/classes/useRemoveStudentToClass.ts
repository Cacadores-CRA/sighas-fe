import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface RemoveStudentToClassParams {
  classId: string;
  enrollment: string;
}

export function useRemoveStudentToClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ classId, enrollment }: RemoveStudentToClassParams) => {
      const response = await customInstance<RemoveStudentToClassParams>({
        url: `/groups/${classId}/removeStudent/${enrollment}`,
        method: 'PATCH',
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}
