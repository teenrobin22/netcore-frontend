import http from './httpService';
const apiEndpoint = '/actividades';

function userUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function Getpaginado(pageNumber, pageSize, userParams) {
    let params = new URLSearchParams();

    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    params.append('userId', userParams.UserId);

    return http.get(apiEndpoint, { params });
}

export function GetActivity(id) {
    return http.get(`${apiEndpoint}/GetActivity/${id}`);
}

export function register(activity) {
    return http.post(`${apiEndpoint}/register`, activity);
}

export function deleteActivity(id) {
    return http.delete(`${apiEndpoint}/deleteActivity/${id}`);
}

export function updateActivity(activity) {
    return http.put(`${apiEndpoint}/UpdateActivity`, activity);
}

export default {
    Getpaginado,
    GetActivity,
    register,
    deleteActivity,
    updateActivity
};