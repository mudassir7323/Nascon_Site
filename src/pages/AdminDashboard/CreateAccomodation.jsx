import React, { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';

function CreateAccommodation() {
  const [formData, setFormData] = useState({
    facility_name: '',
    address: '',
    total_rooms: '',
    contact_person: '',
    contact_number: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
  
    try {
      const token = localStorage.getItem('access_token');
  
      const response = await axios.post(
        `${BaseUrl}/accommodation/`,
        {
          ...formData,
          total_rooms: parseInt(formData.total_rooms, 10),
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setMessage('Accommodation created successfully!');
      setFormData({
        facility_name: '',
        address: '',
        total_rooms: '',
        contact_person: '',
        contact_number: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
      setMessage('Failed to create accommodation.');
    }
  
    setLoading(false);
  };
  
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="mb-4 text-primary">Create New Accommodation</h3>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Facility Name</label>
            <input
              type="text"
              className="form-control"
              name="facility_name"
              value={formData.facility_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Total Rooms</label>
            <input
              type="number"
              className="form-control"
              name="total_rooms"
              value={formData.total_rooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Person</label>
            <input
              type="text"
              className="form-control"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="2"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default CreateAccommodation;
