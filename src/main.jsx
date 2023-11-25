import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from '../src/components/authContext';
import router from './root.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);