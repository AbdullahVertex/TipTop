import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Apis/constantUrl';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Custom hook for API calls
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic API call function
  const apiCall = useCallback(async config => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient(config);
      return response.data;
    } catch (err) {
      let errorMessage = 'An error occurred';

      // Handle different error response structures
      if (err.response?.data) {
        const errorData = err.response.data;

        // Handle 422 validation errors with detail array
        if (errorData.detail && Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map(detail => detail.msg).join(', ');
        }
        // Handle simple message structure
        else if (errorData.message) {
          errorMessage = errorData.message;
        }
        // Handle other error structures
        else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // GET request
  const get = useCallback(
    async (url, config = {}) => {
      return apiCall({
        method: 'GET',
        url,
        ...config,
      });
    },
    [apiCall],
  );

  // POST request
  const post = useCallback(
    async (url, data = {}, config = {}) => {
      console.log('POST Request - URL:', url);
      console.log('POST Request - Data:', data);
      console.log('POST Request - Full URL:', `${BASE_URL}${url}`);
      return apiCall({
        method: 'POST',
        url,
        data,
        ...config,
      });
    },
    [apiCall],
  );

  // PUT request
  const put = useCallback(
    async (url, data = {}, config = {}) => {
      return apiCall({
        method: 'PUT',
        url,
        data,
        ...config,
      });
    },
    [apiCall],
  );

  // DELETE request
  const del = useCallback(
    async (url, config = {}) => {
      return apiCall({
        method: 'DELETE',
        url,
        ...config,
      });
    },
    [apiCall],
  );

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del,
    clearError,
  };
};

// Specific hook for authentication
export const useAuthApi = () => {
  const { post, loading, error, clearError } = useApi();

  const register = useCallback(
    async userData => {
      try {
        console.log('API Hook - Sending data:', userData);
        console.log('API Hook - Endpoint:', '/api/v1/auth/register');
        const response = await post('/api/v1/auth/register', userData);
        return response;
      } catch (err) {
        console.log('API Hook - Error caught:', err);
        throw err;
      }
    },
    [post],
  );

  const login = useCallback(
    async credentials => {
      try {
        const response = await post('/api/v1/auth/login', credentials);
        return response;
      } catch (err) {
        throw err;
      }
    },
    [post],
  );

  return {
    register,
    login,
    loading,
    error,
    clearError,
  };
};
