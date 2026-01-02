import axiosInstance from './api';

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Viewer';
  status: 'Active' | 'Inactive';
  canApproveBetaFlow: boolean;
  canApproveProductionFlow: boolean;
}

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

interface VerifyResponse {
  success: boolean;
  valid: boolean;
}

interface GetCurrentUserResponse {
  success: boolean;
  data: {
    user: User;
  };
}

// Helper function for logout with Redux reset
export const logoutWithReduxReset = () => {
  // Import store and actions dynamically to avoid circular imports
  import('../store/store').then(({ store }) => {
    import('../store/slices/authSlice').then(({ logoutWithReset }) => {
      store.dispatch(logoutWithReset());
    });
  });
  
  // Also call the API logout
  authService.logout().catch(() => {
    // Ignore API errors on logout
  });
};

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      // Ignore errors on logout
      console.log('Logout completed');
    }
  },

  verify: async (): Promise<VerifyResponse> => {
    try {
      const response = await axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      return { success: false, valid: false };
    }
  },

  // Get current user profile (latest data from server)
  getCurrentUser: async (): Promise<GetCurrentUserResponse> => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  },
};
