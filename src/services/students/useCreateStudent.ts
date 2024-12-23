import { StudentStatusType } from '@/@types/students';
import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface StudentPayload {
  userId: string;
  startingDate: string;
  endingDate: string;
  status: StudentStatusType;
  enrollment: string;
  institutionalEmail: string;
}

export interface EditStudentPayload extends StudentPayload {
  affiliationId: string;
}

export interface StudentResponse {
  userId: string;
  enrollment: string;
  name: string;
  surname: string;
  status: 'CREATED' | 'ACTIVE' | 'SUSPENDED' | 'FINISHED';
  institutionalEmail: string;
  createdAt?: string;
}

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StudentPayload) => {
      const response = await customInstance<StudentResponse>({
        url: `/students`,
        method: 'POST',
        data,
      });
      return response;
    },
    onSuccess: () => {
      // Invalidate the query to refetch data
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};
