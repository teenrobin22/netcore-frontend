import http from './httpService';

const apiEndpoint = '/values';

export function getValues() {
  return http.get(apiEndpoint);
}

export default {
  getValues
};
