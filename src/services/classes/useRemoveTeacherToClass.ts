import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface AddTeacherToClassParams {
  classId: string;
  siape: string;
}

export function useRemoveTeacherToClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ classId, siape }: AddTeacherToClassParams) => {
      const response = await customInstance<AddTeacherToClassParams>({
        url: `/groups/${classId}/removeProfessor/${siape}`,
        method: 'PATCH',
      });
      return response;
    },
    onSuccess: () => {
      toast.success('Professor removido com sucesso');
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}
