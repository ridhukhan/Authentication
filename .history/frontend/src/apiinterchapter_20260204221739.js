import axios from "axios"

const server ="http://localhost:3000"
const api = axios.create({
    baseURL:server,
    withCredentials:true,
});
let isRefreshing =false;
let failedQueue= [];
const processQueue=(error,token=null)=>{
    failedQueue.forEach((prom)=>{
        if(error){
            prom.reject(error)
        }else{
            prom.resolve(token)
        }
    })
}