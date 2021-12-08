import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosIntance = axios.create({
  baseURL: 'https://paytix.herokuapp.com/',
});

const tokensOut = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('id');
};

axiosIntance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
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
    const jwtExpired = error.response.data.message;
    if (error.response.data.status === 403 && jwtExpired) {
      tokensOut();
    }
    return Promise.reject(error);
  },
);

export default axiosIntance;
