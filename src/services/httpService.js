import axios from 'axios';

const httpService = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function setJwt(jwt) {
  httpService.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
}

export default {
  get: httpService.get,
  post: httpService.post,
  put: httpService.put,
  delete: httpService.delete,
  setJwt
};
