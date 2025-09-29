import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface User {
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  id: string;
  role: string;
  profile_status: string;
}

interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isFirstTimeUser: boolean;  // ✅ first time open
  hasUserData: boolean;      // ✅ whether user data is available
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isFirstTimeUser: true,  // default true until user opens once
  hasUserData: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: User; tokens: Tokens }>
    ) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.hasUserData = true;   // ✅ once logged in, we have data
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.hasUserData = false;  // ✅ no user data after logout
    },
    setFirstTimeUser: (state, action: PayloadAction<boolean>) => {
      state.isFirstTimeUser = action.payload;
    },
  },
});

export const { login, logout, setFirstTimeUser } = authSlice.actions;
export default authSlice.reducer;
