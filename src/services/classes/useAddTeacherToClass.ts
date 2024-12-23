import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddTeacherToClassParams {
  classId: string;
  siape: string;
}

export function useAddTeacherToClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ classId, siape }: AddTeacherToClassParams) => {
      const response = await customInstance<AddTeacherToClassParams>({
        url: `/groups/${classId}/addProfessor/${siape}`,
        method: 'PATCH',
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}
