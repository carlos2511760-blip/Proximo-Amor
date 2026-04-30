<<<<<<< Updated upstream
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthProvider } from './contexts/AuthContext.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'

const ErrorBoundary = ({ children }) => {
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    const handleError = (e) => setError(e.error || e.reason || e.message);
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', margin: '20px', borderRadius: '8px' }}>
        <h2>Ops! Algo deu errado:</h2>
        <pre>{error.toString()}</pre>
      </div>
    );
  }

  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
>>>>>>> Stashed changes
)
