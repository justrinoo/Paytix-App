import axios from 'axios';

const axiosIntance = axios.create({
  baseURL: 'http://10.0.2.2:3001/',
});

axiosIntance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosIntance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosIntance;
