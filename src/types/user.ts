// User model based on API response
export interface User {
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  id: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  last_login: string;
  role: string;
  profile_status: string;
}

// Tokens model based on API response
export interface Tokens {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
}

// Login response model
export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

// Auth state model
export interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isFirstTime: boolean;
  isAppReady: boolean;
}
