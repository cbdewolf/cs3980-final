import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Create a React root
const root = createRoot(rootElement);

// Render the App component to the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);