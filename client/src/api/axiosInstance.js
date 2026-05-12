import axios from "axios"
const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    (response)=> response,
    async(error)=>{
        const original = error.config
        if (error.response?.status === 401 &&  !original._retry) {
            original._retry = true
            try {
                await axiosInstance.post("/user/refresh-token")
                return axiosInstance(original)
            } catch (error) {
                window.location.href("/login")
            }
        }
        return Promise.reject(error)
    }
)
export default axiosInstance