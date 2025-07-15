// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';
import SearchBar from './components/SearchBar.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <App />
      <Toaster position='top-center' reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </SearchProvider>
  </React.StrictMode>
);
