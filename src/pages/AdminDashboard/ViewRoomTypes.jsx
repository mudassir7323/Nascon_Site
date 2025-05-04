import React, { useEffect, useState } from 'react';
import EditRoomType from './EditRoomType';
import BaseUrl from '../../BaseUrl';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewRoomTypes() {
    const [roomTypes, setRoomTypes] = useState([]);
    const [page, setPage] = useState(0);
    const [limit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const token = localStorage.getItem('access_token');

    const fetchRoomTypes = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BaseUrl}/room_types/?skip=${page * limit}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRoomTypes(res.data);
        } catch (error) {
            console.error("Error fetching room types", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this room type?");
        if (!confirm) return;

        try {
            await axios.delete(`${BaseUrl}/room_types/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRefresh(!refresh);
        } catch (error) {
            console.error("Failed to delete room type", error);
        }
    };

     const handleEdit = (id) => {
        setSelectedId(id);
    }

    useEffect(() => {
        fetchRoomTypes();
        // eslint-disable-next-line
    }, [page, refresh]);

    if (selectedId !== null) {
        return (
            <EditRoomType id={selectedId}/>
        )
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Room Types</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="d-none d-md-block">
                        <table className="table table-bordered table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Type Name</th>
                                    <th>Description</th>
                                    <th>Capacity</th>
                                    <th>Price/Night</th>
                                    <th>Amenities</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomTypes.map((room) => (
                                    <tr key={room.id}>
                                        <td>{room.id}</td>
                                        <td>{room.type_name}</td>
                                        <td>{room.description}</td>
                                        <td>{room.capacity}</td>
                                        <td>{room.price_per_night}</td>
                                        <td>{room.amenities}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() => handleEdit(room.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(room.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="d-block d-md-none">
                        {roomTypes.map((room) => (
                            <div key={room.id} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{room.type_name}</h5>
                                    <p className="card-text">{room.description}</p>
                                    <p className="card-text"><strong>Capacity:</strong> {room.capacity}</p>
                                    <p className="card-text"><strong>Price/Night:</strong> {room.price_per_night}</p>
                                    <p className="card-text"><strong>Amenities:</strong> {room.amenities}</p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleEdit(room.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(room.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={roomTypes.length < limit}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ViewRoomTypes;
