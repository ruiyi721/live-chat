import axios, { AxiosRequestConfig, Method } from "axios";
import { AppEvents, appEmitter } from '@/base/utils/event';
import { apiUrl } from "@/base/config";

export const apiBaseUrl = `${apiUrl}/api`;

const apiTimeoutSec = 60;

// 自定義配置新建一個axios實例
const ajax = axios.create({
  // baseURL: apiBaseUrl,
  baseURL: '/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: apiTimeoutSec * 1000,
});

// 請求攔截器 把token傳給後端
ajax.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err),
);

export async function $http<T = any>(
  method: Method,
  url: string,
  ...payload: any[] // 傳送參數
): Promise<T> {

  const requestData: AxiosRequestConfig = { url, method };

  if (method == 'get' || method == 'GET') {
    requestData.params = payload[0];
  } else {
    // 如果是post等method, 就讓requestData的data等於前端傳送的data
    requestData.data   = payload[0];
    // 此為url上要帶的參數, ~url?ID=123, params: { ID: '123' }
    requestData.params = payload[1];
  }

  try {
    const response = await ajax.request(requestData);
    return response.data;
  } catch (err: any) {
    if (err.response) {
      throw err.response;
    }
    throw err;
  }
}

// 響應攔截器 驗證所有後端傳回的錯誤
export function isResponseOK(
  err: any,
  result: any,
  alertError: boolean = false
) {
  if (err && !result) {
    console.warn(err, result);
    if (err.status == 401) {
      appEmitter.emit(AppEvents.Logout);
    }
    if (alertError) {
      const errData = err.data;
      let message = '';
      if (typeof errData == 'string') {
        message = errData;
      } else {
        message = errData.message;
        try {
          Object.values(errData.errors || {}).forEach((e) => {
            message += `<br>${e[0]}`;
          });
        } catch (err) {
          console.error(err);
        }
      }
      appEmitter.emit(AppEvents.Modal, message);
    }
    return false;
  }
  return true;
}