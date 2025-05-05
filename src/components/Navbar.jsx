import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../utils/authUtils';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [adminUser, setAdminUser] = useState(isAdmin());
  const location = useLocation();

  // Update authentication state when location changes or storage event is triggered
  useEffect(() => {
    const updateAuthState = () => {
      const isAuth = isAuthenticated();
      const isAdm = isAdmin();
      console.log('Navbar: Updating auth state - authenticated:', isAuth, 'admin:', isAdm);
      setAuthenticated(isAuth);
      setAdminUser(isAdm);
    };

    // Initial update
    updateAuthState();

    // Listen for storage events (including our custom one)
    const handleStorageChange = (e) => {
      console.log('Navbar: Storage event detected', e.key);
      updateAuthState();
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log('Navbar: Logging out user');
    // Clear authentication data
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    // Update state
    setAuthenticated(false);
    setAdminUser(false);
    console.log('Navbar: Auth state after logout - authenticated:', false, 'admin:', false);
    // Dispatch storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'user',
      oldValue: 'user data',
      newValue: null
    }));
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <span className="me-1">NASCON</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}>
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                Contact
              </Link>
            </li>

            {!authenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/signin" className={`nav-link ${location.pathname === '/signin' ? 'active' : ''}`}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`}>
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                {adminUser && (
                  <li className="nav-item">
                    <Link to="/AdminDashboard" className={`nav-link ${location.pathname.includes('/AdminDashboard') ? 'active' : ''}`}>
                      Admin Portal
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link btn btn-link"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
