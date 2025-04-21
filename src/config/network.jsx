
import axios from "axios";
import Cookies from "js-cookie";
import { API_ENDPOINT_URL } from "../constant/endpoint";


const api = axios.create({
    baseURL:API_ENDPOINT_URL,
    withCredentials:true,
})


api.interceptors.request.use(
    (config)=>{
        const accessToken = Cookies.get('accessToken');
                
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;  // เพิ่ม token ใน headers
          }
          return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)




export default api;
