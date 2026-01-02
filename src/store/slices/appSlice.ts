import { createSlice } from '@reduxjs/toolkit';
import type { Node, Edge } from '@xyflow/react';

interface AppState {
  title: string;
  isDarkMode: boolean;
  showMiniMap: boolean;
  isFlowLocked: boolean;
  isDrawerOpen: boolean;
  currentFlowData: {
    nodes: Node[];
    edges: Edge[];
    viewport?: { x: number; y: number; zoom: number };
  };
}

// Load dark mode preference from localStorage
const loadDarkModeFromStorage = (): boolean => {
  const saved = localStorage.getItem('theme-dark-mode');
  return saved ? JSON.parse(saved) : false;
};

// Load drawer state from localStorage
const loadDrawerStateFromStorage = (): boolean => {
  const saved = localStorage.getItem('drawer-open');
  return saved ? JSON.parse(saved) : true;
};

// Load minimap state from localStorage
const loadMiniMapFromStorage = (): boolean => {
  const saved = localStorage.getItem('show-minimap');
  return saved ? JSON.parse(saved) : true;
};

const initialState: AppState = {
  title: 'REPI',
  isDarkMode: loadDarkModeFromStorage(),
  showMiniMap: loadMiniMapFromStorage(),
  isFlowLocked: false,
  isDrawerOpen: loadDrawerStateFromStorage(),
  currentFlowData: {
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 },
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Save to localStorage
      localStorage.setItem('theme-dark-mode', JSON.stringify(state.isDarkMode));
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      // Save to localStorage
      localStorage.setItem('theme-dark-mode', JSON.stringify(state.isDarkMode));
    },
    toggleMiniMap: (state) => {
      state.showMiniMap = !state.showMiniMap;
      // Save to localStorage
      localStorage.setItem('show-minimap', JSON.stringify(state.showMiniMap));
    },
    setShowMiniMap: (state, action) => {
      state.showMiniMap = action.payload;
      // Save to localStorage
      localStorage.setItem('show-minimap', JSON.stringify(state.showMiniMap));
    },
    toggleFlowLock: (state) => {
      state.isFlowLocked = !state.isFlowLocked;
    },
    setFlowLock: (state, action) => {
      state.isFlowLocked = action.payload;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
      // Save to localStorage
      localStorage.setItem('drawer-open', JSON.stringify(state.isDrawerOpen));
    },
    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
      // Save to localStorage
      localStorage.setItem('drawer-open', JSON.stringify(state.isDrawerOpen));
    },
    setCurrentFlowData: (state, action) => {
      state.currentFlowData = action.payload;
    },
    loadVersionData: (state, action) => {
      // Load version data (nodes, edges, viewport) from a flow version
      state.currentFlowData = action.payload;
    },
  },
});

export const { setTitle, toggleDarkMode, setDarkMode, toggleMiniMap, setShowMiniMap, toggleFlowLock, setFlowLock, toggleDrawer, setDrawerOpen, setCurrentFlowData, loadVersionData } = appSlice.actions;
export default appSlice.reducer;
