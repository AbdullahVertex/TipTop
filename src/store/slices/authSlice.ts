import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, Tokens, LoginResponse } from '../../types/user';
import { useAuthApi } from '../../hooks/useApi';
import { BASE_URL } from '../../Apis/constantUrl';

// AsyncStorage keys
const ACCESS_TOKEN_KEY = '@access_token';
const REFRESH_TOKEN_KEY = '@refresh_token';
const USER_DATA_KEY = '@user_data';
const IS_FIRST_TIME_KEY = '@is_first_time';

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isFirstTime: true,
  isAppReady: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // This would normally use the API hook, but for Redux we'll handle it differently
      const response = await fetch('https://dev-cup-strmng.vertexaitec.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail?.[0]?.msg || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      
      // Store tokens and user data in AsyncStorage
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.tokens.access_token);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.tokens.refresh_token);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (logoutAllDevices: boolean = false, { rejectWithValue }) => {
    try {
      // Get refresh token from storage
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      
      if (refreshToken) {
        // Call logout API
        const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            logout_all_devices: logoutAllDevices,
            refresh_token: refreshToken,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail?.[0]?.msg || 'Logout failed');
        }

        const data = await response.json();
        console.log('Logout API response:', data);
      }

      // Clear AsyncStorage regardless of API call result
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY]);
      return true;
    } catch (error: any) {
      // Even if API call fails, clear local storage
      try {
        await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY]);
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Async thunk to load stored auth data
export const loadStoredAuth = createAsyncThunk(
  'auth/loadStoredAuth',
  async (_, { rejectWithValue }) => {
    try {
      const [accessToken, refreshToken, userData, isFirstTime] = await AsyncStorage.multiGet([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
        USER_DATA_KEY,
        IS_FIRST_TIME_KEY,
      ]);

      const isFirstTimeUser = isFirstTime[1] === null || isFirstTime[1] === 'true';

      if (accessToken[1] && refreshToken[1] && userData[1]) {
        const user: User = JSON.parse(userData[1]);
        const tokens: Tokens = {
          access_token: accessToken[1],
          refresh_token: refreshToken[1],
          expires_in: 1800, // Default value
          refresh_expires_in: 86400, // Default value
          token_type: 'bearer',
        };

        return { user, tokens, isFirstTime: isFirstTimeUser };
      }
      
      return { user: null, tokens: null, isFirstTime: isFirstTimeUser };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load stored auth');
    }
  }
);

// Async thunk to mark onboarding as completed
export const completeOnboarding = createAsyncThunk(
  'auth/completeOnboarding',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem(IS_FIRST_TIME_KEY, 'false');
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to complete onboarding');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAppReady: (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Load stored auth cases
      .addCase(loadStoredAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFirstTime = action.payload.isFirstTime;
        state.isAppReady = true;
        if (action.payload.user && action.payload.tokens) {
          state.user = action.payload.user;
          state.tokens = action.payload.tokens;
          state.isAuthenticated = true;
        }
      })
      .addCase(loadStoredAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAppReady = true;
      })
      // Complete onboarding cases
      .addCase(completeOnboarding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeOnboarding.fulfilled, (state) => {
        state.isLoading = false;
        state.isFirstTime = false;
      })
      .addCase(completeOnboarding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading, setAppReady } = authSlice.actions;
export default authSlice.reducer;
