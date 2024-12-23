import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditTeacherPayload } from './useCreateTeacher';

interface TeacherResponse {
  userId: string;
  siape: string;
  name: string;
  surname: string;
  status: 'CREATED' | 'ACTIVE' | 'SUSPENDED' | 'FINISHED';
  education:
    | 'HIGH_SCHOOL'
    | 'TECHNICAL_CERTIFICATION'
    | 'ASSOCIATE'
    | 'BACHELOR_EDUCATION'
    | 'BACHELOR'
    | 'POSTGRADUATE'
    | 'MASTER'
    | 'DOCTORATE'
    | 'POST_DOCTORATE';
  institutionalEmail: string;
  createdAt?: string;
}

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditTeacherPayload) => {
      const response = await customInstance<TeacherResponse>({
        url: `/professors/${data.affiliationId}`,
        method: 'PUT',
        data,
      });
      return response;
    },
    onSuccess: () => {
      // Invalidate the query to refetch data
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
  });
};
