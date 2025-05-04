import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../BaseUrl';
import axios from 'axios';

function CreateNewRoomType() {
    const [facilities, setFacilities] = useState([]);
    const [formData, setFormData] = useState({
        type_name: '',
        description: '',
        capacity: '',
        price_per_night: '',
        amenities: '',
        facility_id: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const res = await axios.get(`${BaseUrl}/accommodation/?skip=0&limit=10`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFacilities(res.data);
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };

        fetchFacilities();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.post(
                `${BaseUrl}/room_types/`,
                {
                    ...formData,
                    capacity: parseInt(formData.capacity),
                    price_per_night: parseFloat(formData.price_per_night),
                    facility_id: parseInt(formData.facility_id)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage('✅ Room Type created successfully!');
            setFormData({
                type_name: '',
                description: '',
                capacity: '',
                price_per_night: '',
                amenities: '',
                facility_id: ''
            });
        } catch (error) {
            console.error(error);
            setMessage('❌ Failed to create room type.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">➕ Create New Room Type</h3>

            {message && (
                <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Type Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="type_name"
                        value={formData.type_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows="3"
                        value={formData.description}
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
                    <label className="form-label">Price per Night</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price_per_night"
                        value={formData.price_per_night}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Amenities</label>
                    <input
                        type="text"
                        className="form-control"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        required
                        placeholder="e.g. WiFi, AC, TV"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Facility</label>
                    <select
                        className="form-select"
                        name="facility_id"
                        value={formData.facility_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a facility</option>
                        {facilities.map((facility) => (
                            <option key={facility.id} value={facility.id}>
                                {facility.facility_name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Room Type'}
                </button>
            </form>
        </div>
    );
}

export default CreateNewRoomType;
