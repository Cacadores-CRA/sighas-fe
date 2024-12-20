import { customInstance } from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  expiresIn: string;
}

const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const data = await customInstance<LoginResponse>({
    method: 'POST',
    url: '/auth',
    data: credentials,
  });
  return data;
};

export const useAuth = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token and expiration separately
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('auth', JSON.stringify(data));
      toast.success('Login successful');
    },
    onError: (error) => {
      // Handle login error
      toast.error('Login failed');
      console.error('Login failed:', error);
    },
  });
};
