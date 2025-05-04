import React, { useState } from 'react';
import axios from 'axios';

function CreateRoom() {
    const [formData, setFormData] = useState({
        room_number: '',
        status: '',
        capacity: '',
        facility_id: '',
        room_type_id: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const token = localStorage.getItem('access_token');
        if (!token) {
            setMessage('Access token not found!');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'https://bjikmudtgz.ap.loclx.io/api/v1/rooms/',
                {
                    ...formData,
                    capacity: parseInt(formData.capacity),
                    facility_id: parseInt(formData.facility_id),
                    room_type_id: parseInt(formData.room_type_id)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage('✅ Room created successfully!');
            setFormData({
                room_number: '',
                status: '',
                capacity: '',
                facility_id: '',
                room_type_id: ''
            });
        } catch (error) {
            console.error(error);
            setMessage('❌ Failed to create room.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">➕ Create New Room</h3>

            {message && (
                <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Room Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="room_number"
                        value={formData.room_number}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input
                        type="text"
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Available, Occupied"
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
                    <label className="form-label">Facility ID</label>
                    <input
                        type="number"
                        className="form-control"
                        name="facility_id"
                        value={formData.facility_id}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Room Type ID</label>
                    <input
                        type="number"
                        className="form-control"
                        name="room_type_id"
                        value={formData.room_type_id}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Room'}
                </button>
            </form>
        </div>
    );
}

export default CreateRoom;
