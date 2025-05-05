import React, { useEffect } from 'react'
import AppRoutes from './AppRoutes'
import Navbar from './components/Navbar'
import { isAuthenticated, isAdmin } from './utils/authUtils'

function App() {
  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const adminUser = isAdmin();
      console.log('App: Initial auth check - authenticated:', authenticated, 'admin:', adminUser);

      // Dispatch a storage event to ensure all components are in sync
      if (authenticated) {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'user',
          newValue: localStorage.getItem('user')
        }));
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container-fluid mt-5 pt-4">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
