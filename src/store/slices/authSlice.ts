import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { resetStore } from '../store';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'Admin' | 'User' | 'Viewer';
  status: 'Active' | 'Inactive';
  canApproveBetaFlow: boolean;
  canApproveProductionFlow: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('auth_token'),
  user: localStorage.getItem('auth_user')
    ? JSON.parse(localStorage.getItem('auth_user')!)
    : null,
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  await authService.logout();
  // Clear localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  // Reset entire Redux store
  dispatch(resetStore());
});

// Async thunk for verify token
export const verifyToken = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
  try {
    const result = await authService.verify();
    return result.valid;
  } catch (error) {
    return rejectWithValue('Token verification failed');
  }
});

// Async thunk to fetch current user profile (latest data from server)
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch current user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Keep old reducer for backward compatibility
    login: (state, action: PayloadAction<{ email: string; token: string; user: User }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      // If called from component, trigger global reset
      if (action.payload?.resetStore !== false) {
        // Note: This will be handled by the store's rootReducer
        // We set a flag here that the rootReducer can use
      }
    },
    logoutWithReset: (state) => {
      // This action will be intercepted by rootReducer for global reset
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      })
      // Verify Token
      .addCase(verifyToken.fulfilled, (state, action) => {
        if (!action.payload) {
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
        }
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('auth_user', JSON.stringify(action.payload));
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { login, logout, logoutWithReset, setLoading, clearError } = authSlice.actions;
export default authSlice.reducer;
