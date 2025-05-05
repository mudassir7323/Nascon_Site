import React, { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import './CreateAccommodation.css';

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
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-secondary text-white p-4">
                            <h3 className="mb-0">
                                Create New Accommodation
                            </h3>
                            <p className="text-white-50 mb-0 mt-2">Add a new accommodation facility to the system</p>
                        </div>

                        <div className="card-body p-4">
                            {showMessage && (
                                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} d-flex align-items-center fade show`}
                                    role="alert">
                                    <i className={`bi ${message.includes('success') ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                                    <div>{message}</div>
                                    <button type="button" className="btn-close ms-auto" onClick={() => setShowMessage(false)}></button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="needs-validation">
                                <div className="row g-4 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Facility Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="facility_name"
                                            value={formData.facility_name}
                                            onChange={handleChange}
                                            placeholder="Enter facility name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter complete address"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row g-4 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Total Rooms
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            name="total_rooms"
                                            value={formData.total_rooms}
                                            onChange={handleChange}
                                            placeholder="Enter number of rooms"
                                            required
                                            min="1"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Contact Person
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="contact_person"
                                            value={formData.contact_person}
                                            onChange={handleChange}
                                            placeholder="Enter contact person name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row g-4 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Contact Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="contact_number"
                                            value={formData.contact_number}
                                            onChange={handleChange}
                                            placeholder="Enter contact number"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control form-control-lg"
                                            rows="3"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Enter facility description"
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="card-footer bg-light p-4">
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-lg px-5"
                                    onClick={() => {
                                        setFormData({
                                            facility_name: '',
                                            address: '',
                                            total_rooms: '',
                                            contact_person: '',
                                            contact_number: '',
                                            description: '',
                                        });
                                    }}
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg px-5"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccommodation;
