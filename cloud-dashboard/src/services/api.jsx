import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data || error.message;
        toast.error(`Error: ${message}`);
        return Promise.reject(error);
    }
);

export default apiClient;