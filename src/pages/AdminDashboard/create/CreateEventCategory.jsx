import { useState } from 'react';
import BaseUrl from '../../../BaseUrl';
import axios from 'axios';

function CreateEventCategory() {
  const [formData, setFormData] = useState({
    category_name: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    setLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/event-categories/`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Event Category Created:', response.data);
      alert('Event category created successfully!');
      setFormData({ category_name: '', description: '' }); // reset
    } catch (error) {
      console.error('Failed to create event category:', error);
      alert('Failed to create event category.');
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>Create Event Category</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    name="category_name"
                    className="form-control"
                    placeholder="Enter category name"
                    value={formData.category_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Create Category'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEventCategory;
