import React, { useEffect, useState } from "react";
import EditVenue from "../edit/EditVenue";
import axios from "axios";
import BaseUrl from "../../../BaseUrl";

function ViewVenues() {
    const [venues, setVenues] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const limit = 10;

    const token = localStorage.getItem("access_token");

    const fetchVenues = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`${BaseUrl}/venues/?skip=${(page - 1) * limit}&limit=${limit}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setVenues(response.data.venues || []);
        } catch (err) {
            setError("Failed to fetch venues.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        setSelectedId(id);
    }

    const deleteVenue = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${BaseUrl}/venues/${id}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setVenues((prev) => prev.filter((venue) => venue.id !== id));
        } catch (err) {
            alert("Failed to delete venue.");
        }
    };

    useEffect(() => {
        fetchVenues();
    }, [page]);

    if(selectedId !== null){
        return(
            <EditVenue/>
        )
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">All Venues</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Desktop Table View */}
            <div className="d-none d-md-block">
                {!loading && venues.length === 0 && <p>No venues found.</p>}
                {!loading && venues.length > 0 && (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-primary">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Capacity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venues.map((venue) => (
                                    <tr key={venue.id}>
                                        <td>{venue.id}</td>
                                        <td>{venue.venue_name}</td>
                                        <td>{venue.location}</td>
                                        <td>{venue.venue_type}</td>
                                        <td>{venue.capacity}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={() => handleEdit(venue.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteVenue(venue.id)}
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
                {venues.map((venue) => (
                    <div key={venue.id} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{venue.venue_name}</h5>
                            <p className="card-text"><strong>ID:</strong> {venue.id}</p>
                            <p className="card-text"><strong>Location:</strong> {venue.location}</p>
                            <p className="card-text"><strong>Type:</strong> {venue.venue_type}</p>
                            <p className="card-text"><strong>Capacity:</strong> {venue.capacity}</p>
                            <p className="card-text"><strong>Description:</strong> {venue.description}</p>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => console.log("Edit venue", venue.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteVenue(venue.id)}
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
                    disabled={venues.length < limit}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ViewVenues;
