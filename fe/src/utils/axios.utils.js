import axios from "axios";


export const urlPrefix = 'http://localhost:3001'
export const axiosInstToSv = axios.create({
    baseURL: urlPrefix + '/api'
})
export const axiosAuthInstToApi = axios.create({
    baseURL: urlPrefix + '/api',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth_jwt')
    }
})