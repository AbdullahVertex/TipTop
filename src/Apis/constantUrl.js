// API Base URL
export const BASE_URL = 'https://tiptok-api.vertexaitec.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    REGISTER: '/api/v1/auth/register',
    LOGIN: '/api/v1/auth/login',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH_TOKEN: '/api/v1/auth/refresh',
  },

  // User endpoints
  USERS: {
    PROFILE: '/api/v1/users/profile',
    UPDATE_PROFILE: '/api/v1/users/profile',
    DELETE_ACCOUNT: '/api/v1/users/account',
  },

  // Content endpoints
  CONTENT: {
    VIDEOS: '/api/v1/content/videos',
    UPLOAD: '/api/v1/content/upload',
    DELETE: '/api/v1/content/delete',
  },
};

// Full API URLs
export const API_URLS = {
  REGISTER: `${BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`,
  LOGIN: `${BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
  LOGOUT: `${BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`,
  REFRESH_TOKEN: `${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
  USER_PROFILE: `${BASE_URL}${API_ENDPOINTS.USERS.PROFILE}`,
  UPDATE_PROFILE: `${BASE_URL}${API_ENDPOINTS.USERS.UPDATE_PROFILE}`,
  DELETE_ACCOUNT: `${BASE_URL}${API_ENDPOINTS.USERS.DELETE_ACCOUNT}`,
  VIDEOS: `${BASE_URL}${API_ENDPOINTS.CONTENT.VIDEOS}`,
  UPLOAD: `${BASE_URL}${API_ENDPOINTS.CONTENT.UPLOAD}`,
  DELETE_CONTENT: `${BASE_URL}${API_ENDPOINTS.CONTENT.DELETE}`,
};
