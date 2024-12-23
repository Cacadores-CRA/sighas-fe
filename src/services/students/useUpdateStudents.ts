import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditStudentPayload, StudentResponse } from './useCreateStudent';

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditStudentPayload) => {
      const response = await customInstance<StudentResponse>({
        url: `/students/${data.affiliationId}`,
        method: 'PUT',
        data,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};
