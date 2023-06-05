import axios from "axios";


const getUserToken = () => {
    return localStorage.getItem("token");
};
export const BASE_API = "https://2f74-2405-201-4036-c8bc-a52b-6f3c-ea5f-52c1.ngrok-free.app/api"

const baseApi = axios.create({
    //withCredentials: true
});

baseApi.interceptors.request.use((config) => {
    const token = getUserToken();
    config.baseURL = BASE_API
    if (token && typeof token === "string") {
        config.headers.authorization = `Bearer ${token}`; //Bearer 27|xbMKsmE55AT4K7WfU4EXO8mQVxi7hcDEDLSHjp5Z
    }

    return config;
},);

export default baseApi;