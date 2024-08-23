import axios from 'axios';
import Cookies from 'js-cookie';
import API_URLS from './config/apiUrls';

const API = axios.create({
  baseURL: API_URLS.BASE_URL
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get('mobily-infotech-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
