import { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

function CreateVenue() {
  const [formData, setFormData] = useState({
    venue_name: '',
    location: '',
    capacity: '',
    description: '',
    venue_type: 'Auditorium',
  });

  const [loading, setLoading] = useState(false);

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
    const token = localStorage.getItem('access_token');

    try {
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity, 10),
      };

      await axios.post(`${BaseUrl}/venues/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Venue created successfully!');
      setFormData({
        venue_name: '',
        location: '',
        capacity: '',
        description: '',
        venue_type: 'Auditorium',
      });
    } catch (error) {
      console.error('Failed to create venue:', error);
      alert('Venue creation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Create Venue</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Venue Name</label>
          <input
            type="text"
            className="form-control"
            name="venue_name"
            value={formData.venue_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Capacity</label>
          <input
            type="number"
            className="form-control"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Venue Type</label>
          <select
            className="form-select"
            name="venue_type"
            value={formData.venue_type}
            onChange={handleChange}
            required
          >
            <option value="Auditorium">Auditorium</option>
            <option value="Hall">Hall</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Creating...' : 'Create Venue'}
        </button>
      </form>
    </div>
  );
}

export default CreateVenue;
