import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

const getToken = () => localStorage.getItem('token');

export const AXIOS_INSTANCE = axios.create({
  baseURL: 'http://localhost:8080/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add request interceptor to dynamically set the token
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear localStorage
      localStorage.clear();
      localStorage.removeItem('token');

      // Redirect to login page
      window.location.href = '/login'; // Using window.location since we're outside React context
    }
    return Promise.reject(error);
  }
);

export const customInstance = async <T>(config: AxiosRequestConfig) => {
  const { data } = await AXIOS_INSTANCE(config);
  return data as T;
};

export type ErrorType<Error> = AxiosError<Error>;
