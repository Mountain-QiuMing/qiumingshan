import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../config/constanst';

const axiosInstance = axios.create({
  timeout: 12000,
  baseURL: BASE_URL
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
    if (config?.data?.message) {
    }

    return config.data;
  },
  error => {
    // history.replace('/login');
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else {
      errorMessage = error?.message;
    }
    console.dir(error);
    error.message && console.error(errorMessage);

    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  },
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};

type Method = 'get' | 'post';

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
  // const prefix = '/api'
  const prefix = ''

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
