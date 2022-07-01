import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { apiUrl } from "@/config";

export const apiBaseUrl = `${apiUrl}/api/dora`;

const apiTimeoutSec = 60;

const ajax = axios.create({
  baseURL: apiBaseUrl,
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
    requestData.data   = payload[0];
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