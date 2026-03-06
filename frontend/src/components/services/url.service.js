import axios from "axios"

const ApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: ApiUrl,
})

// Add a request interceptor to add the token and role to all requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['x-user-role'] = user.role || '';
        }
        
        // Important: Don't set Content-Type for FormData requests
        // Let axios set it automatically with the correct boundary
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
