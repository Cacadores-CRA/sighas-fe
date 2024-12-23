import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddStudentToClassParams {
  classId: string;
  enrollment: string;
}

export function useAddStudentToClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ classId, enrollment }: AddStudentToClassParams) => {
      const response = await customInstance<AddStudentToClassParams>({
        url: `/groups/${classId}/addStudent/${enrollment}`,
        method: 'PATCH',
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}
