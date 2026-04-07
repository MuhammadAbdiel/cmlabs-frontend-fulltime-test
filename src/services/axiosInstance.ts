import axios from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT_MS } from '@/constants/api.constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor ──────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ─────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network / CORS / timeout errors
      console.error('[API] Network error:', error.message);
      return Promise.reject(new Error('Network error — please check your connection.'));
    }

    const { status } = error.response as { status: number };

    if (status === 401) {
      console.error('[API] Unauthorised (401)');
      return Promise.reject(new Error('Unauthorised request.'));
    }

    if (status >= 500) {
      console.error('[API] Server error:', status);
      return Promise.reject(new Error('Server error — please try again later.'));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
