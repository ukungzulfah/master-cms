import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      zustand: path.resolve(__dirname, './node_modules/zustand'),
      'use-sync-external-store': path.resolve(__dirname, './node_modules/use-sync-external-store'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
