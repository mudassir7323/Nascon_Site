import React, { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

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
    const [showMessage, setShowMessage] = useState(false);

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
            const token = localStorage.getItem('access_token');

            await axios.post(
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
            setShowMessage(true);
        } catch (error) {
            console.error(error);
            setMessage('Failed to create accommodation.');
            setShowMessage(true);
        }

        setLoading(false);
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white text-secondary py-3">
                            <h5 className="mb-0">Create New Accommodation</h5>
                        </div>
                        <div className="card-body p-4">
                            {showMessage && (
                                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show mb-3`} role="alert">
                                    {message}
                                    <button type="button" className="btn-close" onClick={() => setShowMessage(false)} aria-label="Close"></button>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="facility_name" className="form-label fw-semibold">Facility Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg shadow-sm"
                                        id="facility_name"
                                        name="facility_name"
                                        value={formData.facility_name}
                                        onChange={handleChange}
                                        placeholder="Enter facility name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label fw-semibold">Address</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg shadow-sm"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter complete address"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="total_rooms" className="form-label fw-semibold">Total Rooms</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-lg shadow-sm"
                                        id="total_rooms"
                                        name="total_rooms"
                                        value={formData.total_rooms}
                                        onChange={handleChange}
                                        placeholder="Enter number of rooms"
                                        required
                                        min="1"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contact_person" className="form-label fw-semibold">Contact Person</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg shadow-sm"
                                        id="contact_person"
                                        name="contact_person"
                                        value={formData.contact_person}
                                        onChange={handleChange}
                                        placeholder="Enter contact person name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contact_number" className="form-label fw-semibold">Contact Number</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg shadow-sm"
                                        id="contact_number"
                                        name="contact_number"
                                        value={formData.contact_number}
                                        onChange={handleChange}
                                        placeholder="Enter contact number"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-semibold">Description</label>
                                    <textarea
                                        className="form-control form-control-lg shadow-sm"
                                        id="description"
                                        rows="3"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter facility description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-lg me-2"
                                        onClick={() => setFormData({
                                            facility_name: '',
                                            address: '',
                                            total_rooms: '',
                                            contact_person: '',
                                            contact_number: '',
                                            description: '',
                                        })}
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
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit'
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

export default CreateAccommodation;
