import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';

function EditAccommodation({ id }) {
  const [formData, setFormData] = useState({
    facility_name: '',
    address: '',
    total_rooms: '',
    contact_person: '',
    contact_number: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `${BaseUrl}/accommodation/${id}`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accommodation details:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
  
    console.log("Form data being sent:", formData);
  
    try {
      const response = await axios.put(
        `${BaseUrl}/accommodation/${id}`,
        {
          facility_name: formData.facility_name.trim(),
          address: formData.address.trim(),
          total_rooms: parseInt(formData.total_rooms),
          contact_person: formData.contact_person.trim(),
          contact_number: formData.contact_number.trim(),
          description: formData.description.trim(),
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Update response:", response.data);
      alert('Accommodation updated successfully!');
      // Uncomment the line below only if you pass onBack as a prop
      if (onBack) onBack();
  
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      alert('Update failed. Please check the inputs or try again.');
    }
  };
   

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Edit Accommodation</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Facility Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="facility_name"
                  value={formData.facility_name}
                  onChange={handleChange}
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
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Total Rooms</label>
                <input
                  type="number"
                  className="form-control"
                  name="total_rooms"
                  value={formData.total_rooms}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Contact Person</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update Accommodation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccommodation;
