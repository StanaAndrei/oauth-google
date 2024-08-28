import axios from "axios";


export const urlPrefix = 'http://localhost:3001'
export const axiosInstToSv = axios.create({
    baseURL: urlPrefix + '/api'
})