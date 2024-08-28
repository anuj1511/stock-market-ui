import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from '../lib/constansts';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/polls',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the authorization token in every request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchData = async <T = any>(url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(url, options);
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error response data:', axiosError.response.data);
        console.error('Error response status:', axiosError.response.status);
      } else {
        console.error('Error message:', axiosError.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
