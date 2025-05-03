import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAccommodation from './EditAccommodation';
import BaseUrl from '../../BaseUrl';

function ViewAccommodation() {
    const [accommodations, setAccommodations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAccommodations, setTotalAccommodations] = useState(0);
    const pageSize = 10;

    const fetchData = async (page) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get(
                `${BaseUrl}/accommodation/?skip=${(page - 1) * pageSize}&limit=${pageSize}`,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAccommodations(response.data);
            setTotalAccommodations(100); // Replace with actual total count if available from backend
        } catch (err) {
            console.error('Fetch failed:', err);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, ]);

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        } else if (direction === 'next' && currentPage * pageSize < totalAccommodations) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleEdit = (id) => {
        setSelectedId(id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this accommodation?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.delete(
                `${BaseUrl}/accommodation/${id}`, // replace `id` with your actual accommodation ID
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert('Accommodation deleted successfully!');
            fetchData(currentPage);
            // Optionally redirect or go back
            // if (onBack) onBack();
        } catch (error) {
            console.error('Delete failed:', error.response?.data || error.message);
            alert('Delete failed. Please try again.');
        }
    };


    const handleBackToList = () => {
        setSelectedId(null);
        fetchData(currentPage);
    };

    if (selectedId !== null) {
        return <EditAccommodation id={selectedId} onBack={handleBackToList} />;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>View Accommodations</h4>
                <div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => handlePageChange('prev')}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => handlePageChange('next')}
                        disabled={currentPage * pageSize >= totalAccommodations}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Table for large screens */}
            <div className="d-none d-md-block">
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Facility Name</th>
                                <th>Address</th>
                                <th>Total Rooms</th>
                                <th>Contact Person</th>
                                <th>Contact Number</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accommodations.map((acc) => (
                                <tr key={acc.id}>
                                    <td>{acc.facility_name}</td>
                                    <td>{acc.address}</td>
                                    <td>{acc.total_rooms}</td>
                                    <td>{acc.contact_person}</td>
                                    <td>{acc.contact_number}</td>
                                    <td>{acc.description}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleEdit(acc.id)}
                                        >
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(acc.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cards for small screens */}
            <div className="d-block d-md-none">
                {accommodations.map((acc) => (
                    <div key={acc.id} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{acc.facility_name}</h5>
                            <p className="card-text">
                                <strong>Address:</strong> {acc.address} <br />
                                <strong>Rooms:</strong> {acc.total_rooms} <br />
                                <strong>Person:</strong> {acc.contact_person} <br />
                                <strong>Phone:</strong> {acc.contact_number} <br />
                                <strong>Description:</strong> {acc.description}
                            </p>
                            <div>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => handleEdit(acc.id)}
                                >
                                    Edit
                                </button>
                                <button className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(acc.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewAccommodation;
