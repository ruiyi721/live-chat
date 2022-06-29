import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

const apiTimeoutSec = 60;

const ajax = axios.create({
  baseURL: "https://vue-course-api.hexschool.io/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: apiTimeoutSec * 1000,
});
