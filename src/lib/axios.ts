import type { InternalAxiosRequestConfig } from 'axios';
import Axios, { AxiosHeaders } from 'axios';
import { API_URL } from 'config';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const newConfig = { ...config };
  const token = getCookie('ascent_u_access_token');
  if (token) {
    if (!newConfig.headers) {
      newConfig.headers = new AxiosHeaders();
    }
    (newConfig.headers as AxiosHeaders).set('authorization', `Bearer ${token}`);
  }
  return newConfig;
}

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function setAuthBaseURL() {
  axios.defaults.baseURL = API_URL;
}

axios.interceptors.request.use((config) => {
  return authRequestInterceptor(config);
});

axios.interceptors.response.use(
  (response) => {
    axios.defaults.baseURL = API_URL;
    return response.data;
  },
  async (error) => {
    axios.defaults.baseURL = API_URL;
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest.retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(async (token) => {
            originalRequest.headers.authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest.retry = true;
      isRefreshing = true;
      const refreshToken = getCookie('ascent_u_refresh_token');
      if (!refreshToken) {
        deleteCookie('ascent_u_access_token');
        window.location.replace('/auth/login');
        return Promise.reject(error);
      }

      try {
        setAuthBaseURL();
        const response: any = await axios.post('/api/auth/token/refresh/', {
          refresh: refreshToken,
        });
        const { access } = response;
        setCookie('ascent_u_access_token', access);
        processQueue(null, access);
        originalRequest.headers.authorization = `Bearer ${access}`;
        return await axios(originalRequest);
      } catch (retryError) {
        processQueue(retryError, null);
        deleteCookie('ascent_u_access_token');
        window.location.replace('/auth/login');
        return await Promise.reject(retryError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export { axios, setAuthBaseURL };
