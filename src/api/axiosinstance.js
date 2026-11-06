// const axios = require('axios')
import { config } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://bookstore-server-23l1.onrender.com',
    timeout: '10000'
})

// request interceptor:Handling Token append to Headers
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

// response interceptors: handling global/common errors
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("response received");
        return response
    },
    (error) => {
        if (error.response) {
            const status = error.response.status
            if (status === 401) {
                console.log("Un-Authorized");
            }
            else if (status === 404) {
                console.log("API Not Found");
            }
            else if (status === 500) {
                console.log("Server error!!");
            }
            else if(error.request) {
                console.log("client error");
                return error.request
            }
            else {
                console.log("Error:"+error.message);
            }
            return Promise.reject(error)
        }
    }
)
export default axiosInstance