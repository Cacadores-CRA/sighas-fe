import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

// TODO: add api url to enviroment
export const AXIOS_INSTANCE = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

export const customInstance = async <T>(config: AxiosRequestConfig) => {
  const { data } = await AXIOS_INSTANCE(config);
  return data as T;
};

export type ErrorType<Error> = AxiosError<Error>;
