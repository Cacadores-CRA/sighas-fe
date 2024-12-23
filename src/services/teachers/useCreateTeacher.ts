import { customInstance } from '@/api/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface TeacherPayload {
  userId: string;
  startingDate: string;
  endingDate: string;
  status: 'CREATED';
  siape: string;
  education: string;
  institutionalEmail: string;
}

export interface EditTeacherPayload extends TeacherPayload {
  affiliationId: string;
}

export interface TeacherResponse {
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

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TeacherPayload) => {
      const response = await customInstance<TeacherResponse>({
        url: `/professors`,
        method: 'POST',
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
