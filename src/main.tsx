import { SubmissionProvider } from './context/SubmissionProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
//import ShiftHistory from './pages/ShiftHistory.tsx'; // make sure this path is correct
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

 ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SubmissionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SubmissionProvider>
  </React.StrictMode>
);