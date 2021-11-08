import axios, { AxiosInstance } from 'axios';

const BASE = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => axios.create({
  baseURL: BASE,
  timeout: REQUEST_TIMEOUT,
});
