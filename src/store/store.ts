import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import appSlice from './slices/appSlice';
import authSlice from './slices/authSlice';

// Combine all reducers
const combinedReducers = combineReducers({
  app: appSlice,
  auth: authSlice,
});

// Root reducer with global reset capability
const rootReducer = (state: any, action: any) => {
  // Reset all state when RESET_STORE action is dispatched or logoutWithReset
  if (action.type === 'RESET_STORE' || action.type === 'auth/logoutWithReset') {
    // Clean up user-specific localStorage data
    localStorage.removeItem('flow-versions');
    localStorage.removeItem('active-version-id');
    localStorage.removeItem('env_content'); // Temporary editor content
    
    // Preserve app settings that should persist across sessions
    const preservedAppState = state?.app ? {
      title: state.app.title,
      isDarkMode: state.app.isDarkMode, // Keep theme preference
      showMiniMap: true, // Reset to default
      isFlowLocked: false, // Reset to default
      isDrawerOpen: state.app.isDrawerOpen, // Keep drawer preference
    } : undefined;
    
    // Reset to clean state but preserve user preferences
    state = preservedAppState ? {
      app: preservedAppState,
    } : undefined;
  }
  
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export typed hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Global reset action
export const resetStore = () => ({ type: 'RESET_STORE' });
