import axios from 'axios';
import queryString from 'query-string';
// import queryString from 'query-string';

const axiosClient = axios.create({
  // baseURL: 'http://localhost:8000',
  // baseURL: 'http://localhost:6969',
  baseURL: 'https://cum-api.onrender.com',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) =>
      queryString.stringify(params, { arrayFormat: 'bracket' }),
  },
  // (params) =>
  //   queryString.stringify(params, { arrayFormat: 'brackets' }),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
});

export default axiosClient;
