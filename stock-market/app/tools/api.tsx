import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

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
    // Get the token from cookies
    const token = Cookies.get('authToken');

    // Add the token to the request headers if it exists
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export const fetchData = async <T = any>(url: string, options: AxiosRequestConfig = {}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(url, options);
    return response.data;
  } catch (error: any) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not fetch data');
  }
};
