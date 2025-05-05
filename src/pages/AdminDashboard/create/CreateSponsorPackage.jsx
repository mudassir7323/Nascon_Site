import React, { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

function CreateSponsorPackage() {
  const [formData, setFormData] = useState({
    package_name: '',
    description: '',
    price: '',
    benefits: '',
    max_sponsors: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const accessToken = localStorage.getItem('access_token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setShowMessage(false);

    try {
      await axios.post(
        `${BaseUrl}/sponsorship/packages/`,
        {
          ...formData,
          price: Number(formData.price),
          max_sponsors: Number(formData.max_sponsors),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('✅ Sponsor package created successfully!');
      setFormData({
        package_name: '',
        description: '',
        price: '',
        benefits: '',
        max_sponsors: '',
      });
    } catch (error) {
      console.error('Error creating package:', error);
      setMessage('❌ Failed to create sponsor package.');
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const resetForm = () => {
    setFormData({
      package_name: '',
      description: '',
      price: '',
      benefits: '',
      max_sponsors: '',
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white text-secondary py-3">
              <h5 className="mb-0">Create Sponsor Package</h5>
            </div>
            <div className="card-body p-4">
              {showMessage && (
                <div
                  className={`alert ${message.startsWith('✅') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show mb-3`}
                  role="alert"
                >
                  {message}
                  <button type="button" className="btn-close" onClick={() => setShowMessage(false)} aria-label="Close"></button>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Package Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg shadow-sm"
                    name="package_name"
                    value={formData.package_name}
                    onChange={handleChange}
                    placeholder="Enter package name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Price (USD)</label>
                  <input
                    type="number"
                    className="form-control form-control-lg shadow-sm"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Max Sponsors</label>
                  <input
                    type="number"
                    className="form-control form-control-lg shadow-sm"
                    name="max_sponsors"
                    value={formData.max_sponsors}
                    onChange={handleChange}
                    placeholder="Enter max sponsors"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control form-control-lg shadow-sm"
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter package description"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Benefits</label>
                  <textarea
                    className="form-control form-control-lg shadow-sm"
                    rows="3"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="Enter package benefits"
                    required
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg me-2"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : (
                      'Create Package'
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer bg-light p-3 d-flex justify-content-between align-items-center">
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                All fields are required
              </small>
              <small className="text-muted">&copy; {new Date().getFullYear()} Event Admin Panel</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSponsorPackage;
