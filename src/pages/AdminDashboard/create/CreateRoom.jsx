import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../BaseUrl';
import axios from 'axios';

function CreateRoom() {
    const [formData, setFormData] = useState({
        room_number: '',
        status: '',
        capacity: '',
        facility_id: '',
        room_type_id: ''
    });

    const [facilities, setFacilities] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false); // Added for message visibility

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [facRes, roomTypeRes] = await Promise.all([
                    axios.get(`${BaseUrl}/accommodation/?skip=0&limit=10`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${BaseUrl}/room_types/?skip=0&limit=10`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setFacilities(facRes.data);
                setRoomTypes(roomTypeRes.data);
            } catch (error) {
                console.error("Failed to fetch dropdown data", error);
                setMessage('Failed to fetch initial data.'); // Set error message
                setShowMessage(true);
            }
        };

        fetchDropdownData();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear previous messages
        setShowMessage(false);

        if (!token) {
            setMessage('Authentication token not found. Please log in.');
            setShowMessage(true);
            setLoading(false);
            return;
        }

        try {
            await axios.post(
                `${BaseUrl}/rooms/`,
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
            setMessage('Room created successfully!');
            setShowMessage(true); // Show success message
            setFormData({ // Reset form
                room_number: '',
                status: '',
                capacity: '',
                facility_id: '',
                room_type_id: ''
            });
        } catch (error) {
            console.error(error);
             setMessage(`Failed to create room.  ${error.response?.data?.message || 'Please check your input data.'}`);
            setShowMessage(true); // Show error message
        } finally {
            setLoading(false);
        }
    };

      const handleReset = () => {
        setFormData({
            room_number: '',
            status: '',
            capacity: '',
            facility_id: '',
            room_type_id: ''
        });
        setMessage('');
        setShowMessage(false);
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h2 className="mb-4">Create New Room</h2>

                    {showMessage && (
                        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                            {message}
                            <button type="button" className="btn-close" onClick={() => setShowMessage(false)} aria-label="Close"></button>
                        </div>
                    )}

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit} className="needs-validation">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Room Number</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="room_number"
                                        value={formData.room_number}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter room number"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Status</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Available, Occupied"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Capacity</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-lg"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        placeholder="Enter room capacity"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Facility</label>
                                    <select
                                        className="form-select form-select-lg"
                                        name="facility_id"
                                        value={formData.facility_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Facility</option>
                                        {facilities.map(facility => (
                                            <option key={facility.id} value={facility.id}>
                                                {facility.name || `Facility #${facility.id}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Room Type</label>
                                    <select
                                        className="form-select form-select-lg"
                                        name="room_type_id"
                                        value={formData.room_type_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Room Type</option>
                                        {roomTypes.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.type_name || `Type #${type.id}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-lg"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </button>
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                        {loading ? (
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                <span>Creating...</span>
                                            </div>
                                        ) : (
                                            'Create Room'
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
                    <div className="text-center mt-4">
                        <a href="#" className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-arrow-left me-1"></i>
                            Back to Rooms
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRoom;
