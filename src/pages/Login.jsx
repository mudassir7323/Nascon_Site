import React, { useState } from 'react';
import BaseUrl from '../BaseUrl';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/authUtils';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${BaseUrl}/users/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Handle successful login here
      console.log('Login successful, setting access token');
      localStorage.setItem('access_token', data.access_token);
      try {
        // Fetch user data with the token
        console.log('Fetching user data with token');
        const user_response = await fetch(`${BaseUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.access_token}`
          },
        });

        if (!user_response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const user_data = await user_response.json();
        console.log('User data received:', user_data); // Log user data for debugging
        localStorage.setItem('user', JSON.stringify(user_data));
        console.log('User data saved to localStorage');

      } catch(err) {
      console.error('Failed to validate token:', err);
      setError('Failed to validate token. Please try again.');
      setLoading(false);
      return;
    }
      // Check if the user is an admin using our utility function
      if (isAdmin()) {
        // If user is an admin, navigate to admin dashboard
        nav("/AdminDashboard");
      } else {
        // If not an admin, navigate to home page
        nav("/");
      }

      // Force a re-render of components by triggering a custom event
      console.log('Dispatching storage event to update UI');
      // Use StorageEvent for better browser compatibility
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'user',
        newValue: localStorage.getItem('user')
      }));

    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="remember">Remember me</label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </span>
                  ) : 'Login'}
                </button>
              </form>
              <div className="text-center mt-3">
                <a href="#" className="text-decoration-none">Forgot password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;