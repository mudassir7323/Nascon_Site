import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../../BaseUrl";

function ViewAllRequests() {
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const limit = 10;

    const token = localStorage.getItem("access_token");

    const fetchRequests = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(
                `${BaseUrl}/requests/pending/?skip=${(page - 1) * limit}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            setRequests(response.data);
        } catch (err) {
            setError("Failed to fetch requests.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [page]);

    const handleAccept = async (id) => {
        try {
            await axios.post(
                `${BaseUrl}/requests/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            alert("Request approved successfully");
            fetchRequests(); // Refresh list
        } catch (err) {
            alert("Failed to approve request");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(
                `${BaseUrl}/requests/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            alert("Request rejected successfully");
            fetchRequests(); // Refresh list
        } catch (err) {
            alert("Failed to reject request");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">All Pending Requests</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Desktop Table View */}
            <div className="d-none d-md-block">
                {!loading && requests.length === 0 && <p>No requests found.</p>}
                {!loading && requests.length > 0 && (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.id}</td>
                                        <td>{request.user_name || "N/A"}</td>
                                        <td>{new Date(request.created_at).toLocaleString()}</td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleAccept(request.id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(request.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Mobile Card View */}
            <div className="d-md-none">
                {requests.map((request) => (
                    <div key={request.id} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">ID: {request.id}</h5>
                            <p className="card-text">Name: {request.user_name || "N/A"}</p>
                            <p className="card-text">
                                Created: {new Date(request.created_at).toLocaleString()}
                            </p>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => handleAccept(request.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(request.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-3">
                <button
                    className="btn btn-secondary"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    className="btn btn-secondary"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={requests.length < limit}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ViewAllRequests;
