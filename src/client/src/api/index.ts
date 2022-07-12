import axios, { AxiosRequestConfig, Method } from 'axios';
import { BASE_URL } from '../config/constants';
import { toast } from '@/utils/toast';
import { getCookies, removeCookies } from 'cookies-next';

const axiosInstance = axios.create({
  timeout: 12000,
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    if (config.data?.message) {
      toast.warning(config.data.message);
    }

    return config.data;
  },
  error => {
    const cookies = getCookies();
    // console.dir(error);
    if (error.response?.status === 401) {
      for (const key in cookies) {
        removeCookies(key);
      }
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
      return {
        status: false,
        code: error.response.status,
        message: '',
        result: null,
      };
    }

    // history.replace('/login');
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else {
      errorMessage = error.message || error?.response.data?.message;
    }
    toast.error(errorMessage);
    error.message && console.error('error: ', errorMessage);

    return {
      status: false,
      code: error.response.status,
      message: errorMessage,
      result: null,
    };
  },
);

export type Response<T = any> = {
  status: boolean;
  code: number;
  message: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - 请求方法
 * @param url - 请求路径
 * @param data - 请求 query 参数或者 body 参数
 */
export const request = <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  const prefix = '/api';

  url = prefix + url;
  if (method === 'get') {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  } else {
    return axiosInstance[method](url, data, config);
  }
};

export const fetcher = {
  get: (url: string) => request('get', url),
  post: (url: string) => request('post', url),
};
