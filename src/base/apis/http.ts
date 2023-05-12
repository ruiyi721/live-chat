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

export async function $http<T = any>(
  method: Method,
  url: string,
  ...payload: any[]
): Promise<T> {

  const requestData: AxiosRequestConfig = { url, method };

  if (method == 'get' || method == 'GET') {
    requestData.params = payload[0];
  } else {
    // 如果是post等method, 就讓requestData的data等於前端傳送的data, params是payload的第二項資料
    requestData.data = payload[0];
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

export function isResponseOK(
  err: any,
  result: any,
  alertError: boolean = false
) {
  if(err && !result) {
    console.warn(err, result);
    if (err.status == 401) {
      
    }
    if(alertError) {
      const errData = err.data;
      let message = '';
      if (typeof errData == 'string') {
        message = errData;
      } else {
        message = errData.message;
      }
      appEmitter.emit(AppEvents.Modal, message);
    }
    return false;
  }
  return true;
}