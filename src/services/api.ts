import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';

const BACKEND_URL = 'https://16.react.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];
let is401WarningSuppressed = false;

const show401ToastOncePerWindow = (message: string, windowMs = 2000) => {
  if (!is401WarningSuppressed) {
    toast.warn(message);
    is401WarningSuppressed = true;
    setTimeout(() => {
      is401WarningSuppressed = false;
    }, windowMs);
  }
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        const status = error.response.status;
        const message = (error.response.data as { error: string })?.error;

        if (status === StatusCodes.UNAUTHORIZED) {
          show401ToastOncePerWindow(message);
        } else {
          toast.warn(message);
        }
      }

      throw error;
    }
  );
  return api;
};

