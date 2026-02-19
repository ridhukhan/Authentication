import axios from "axios"

const getCookie=(name)=>{
    const value=`;${document.cookie}`
    const parts=value.split(`;${name}=`)
    if(parts.length===2) return parts.pop().split(";").shift()
}
const api = axios.create({
    baseURL:"https://authentication-tz5b.onrender.com/api",
    withCredentials:true,
});

api.interceptors.request.use(
   (config)=>{
    if(config.method==="post" || config.method === "put" || config.method==="delete"){
        const csrfToken=getCookie("csrfToken");
        if(csrfToken){
            config.headers["x-csrf-token"]=csrfToken;
        }
    }
    return config
   },(error)=>{
    return Promise.reject(error)
   }
);
const queues = { auth: [], csrf: [] };
const flags = { auth: false, csrf: false };

const processQueue = (type, error = null) => {
  queues[type].forEach((p) => (error ? p.reject(error) : p.resolve()));
  queues[type] = [];
};


const handleRefresh = async (type, endpoint, originalRequest) => {
  if (flags[type]) {
    return new Promise((resolve, reject) => {
      queues[type].push({ resolve, reject });
    }).then(() => api(originalRequest));
  }

  flags[type] = true;
  originalRequest._retry = true;

  try {
    await api.post(endpoint);
    processQueue(type);
    return api(originalRequest);
  } catch (err) {
    processQueue(type, err);
    return Promise.reject(err);
  } finally {
    flags[type] = false;
  }
};


api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 403 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const errorCode = error.response.data?.code || "";

    if (errorCode.startsWith("CSRF_")) {
      return handleRefresh("csrf", "/user/refresh-csrf", originalRequest);
    }

    return handleRefresh("auth", "/user/refresh", originalRequest);
  }
);

export default api;
