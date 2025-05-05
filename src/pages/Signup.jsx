import React, { useState } from 'react';
import BaseUrl from '../BaseUrl';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    university: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Prepare data for API - remove confirmPassword and empty optional fields
    const apiData = {...formData};
    delete apiData.confirmPassword;

    // Remove empty optional fields
    if (!apiData.phone_number) delete apiData.phone_number;
    if (!apiData.address) delete apiData.address;
    if (!apiData.university) delete apiData.university;

    try {
      const response = await fetch(`${BaseUrl}/users/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Redirect to login page after successful signup
      nav("/signin");

    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center py-5">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Create an Account</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email*</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="first_name" className="form-label">First Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last_name" className="form-label">Last Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Optional fields */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="phone_number" className="form-label">Phone Number (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="university" className="form-label">University (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address (optional)</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={loading}
                    rows="2"
                  ></textarea>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing up...
                    </span>
                  ) : 'Sign Up'}
                </button>
              </form>
              <div className="text-center mt-3">
                Already have an account? <a href="/signin" className="text-decoration-none">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;