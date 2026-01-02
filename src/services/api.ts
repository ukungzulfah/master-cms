import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
import.meta.env.VITE_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't set Content-Type for FormData - let browser handle it
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to convert snake_case to camelCase
const convertSnakeToCamel = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertSnakeToCamel);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      result[camelKey] = convertSnakeToCamel(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
};

// Response interceptor - Handle errors and transform data
axiosInstance.interceptors.response.use(
  (response) => {
    // DISABLED: Transform snake_case to camelCase
    // This was causing confusion between API response and frontend expectations
    // Better to handle conversion explicitly in services when needed
    
    // if (
    //   response.data &&
    //   typeof response.data === 'object' &&
    //   !(response.data instanceof Blob) &&
    //   !(response.data instanceof ArrayBuffer) &&
    //   response.data.constructor === Object
    // ) {
    //   response.data = convertSnakeToCamel(response.data);
    // }
    
    return response;
  },
  (error) => {
    // Handle 401 - Token expired or invalid
    if (error.response?.status === 401) {
      // Token expired or invalid, trigger logout with Redux reset
      import('../store/store').then(({ store }) => {
        import('../store/slices/authSlice').then(({ logoutWithReset }) => {
          store.dispatch(logoutWithReset());
          // Redirect after state is reset
          setTimeout(() => {
            window.location.href = '/login';
          }, 100);
        });
      });
    }
    
    // Create a properly formatted error object that preserves all error information
    const errorObj = new Error();
    
    // Handle error response from backend
    if (error.response?.data) {
      // Backend returned error data
      if (typeof error.response.data === 'string') {
        errorObj.message = error.response.data;
      } else if (error.response.data?.message) {
        // Most common case - error.response.data has a message field
        errorObj.message = error.response.data.message;
      } else if (error.response.data?.error) {
        errorObj.message = error.response.data.error;
      } else {
        errorObj.message = JSON.stringify(error.response.data);
      }
      
      // Preserve response data for component access
      (errorObj as any).response = error.response;
    } else if (error.request) {
      // Request made but no response received
      errorObj.message = 'Tidak ada respons dari server. Periksa koneksi Anda.';
      (errorObj as any).response = error.response;
    } else {
      // Error in request setup
      errorObj.message = error.message || 'Terjadi kesalahan. Silakan coba lagi.';
    }
    
    return Promise.reject(errorObj);
  }
);

export default axiosInstance;
