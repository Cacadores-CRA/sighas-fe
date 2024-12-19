import api from '@/api/axios';
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
  const { data } = await api.post('/auth', credentials);
  return data;
};

export const useAuth = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Handle successful login
      // For example, store the token in localStorage
      console.log('success');
      toast.success('Login successful');
      localStorage.setItem('auth', JSON.stringify(data));
    },
    onError: (error) => {
      // Handle login error
      toast.error('Login failed');
      console.error('Login failed:', error);
    },
  });
};
