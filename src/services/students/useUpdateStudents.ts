import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface StudentResponse {
  userId: string;
  name: string;
  status: string;
  enrollment: string;
  institutionalEmail: string;
  createdAt?: string;
}

interface StudentPayload {
  userId: string;
  enrollment: string;
  status: 'CREATED';
  institutionalEmail: string;
}

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StudentPayload) => {
      const response = await customInstance<StudentResponse>({
        url: `/students/${data.userId}`,
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
