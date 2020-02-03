import http from './httpService';
import jwtDecode from 'jwt-decode';

const apiEndPoint = '/auth';
const tokenKey = 'token';
const userKey = 'user';

export async function login(model) {
  const { data: credentials } = await http.post(`${apiEndPoint}/login`, model);
  if (credentials) {
    localStorage.setItem(tokenKey, credentials.token);
    localStorage.setItem(userKey, JSON.stringify(credentials.user));
    http.setJwt(getJwt());
  }
  return credentials;
}

export function trySignUp() {
  let credentials;
  try {
    //Obtener el token
    const token = getJwt();
    if (token) {
      const decodedToken = getDecodedToken();
      const currentUser = JSON.parse(getCurrentUser());
      credentials = {
        token,
        decodedToken,
        currentUser
      };
      http.setJwt(getJwt());
    }
  } catch (error) {
    return null;
  }
  return credentials;
}

function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

export function getJwt() {
  return getLocalStorageItem(tokenKey);
}

export function getDecodedToken() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function getCurrentUser() {
  try {
    return getLocalStorageItem(userKey);
  } catch (error) {
    return null;
  }
}

export function register(user) {
  return http.post(`${apiEndPoint}/register`, user);
}

export function setCurrentUser(user) {
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

export default {
  login,
  register,
  getDecodedToken,
  logout,
  getJwt,
  trySignUp,
  setCurrentUser
};
