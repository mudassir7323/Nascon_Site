import React, { useEffect, useState } from 'react';
import BaseUrl from '../../BaseUrl';
import axios from 'axios';
import EditRoom from './EditRoom';

function ViewRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axios.get(`${BaseUrl}/rooms/?skip=0&limit=100`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                });
                setRooms(res.data);
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
                setMessage('❌ Failed to load rooms.');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [token]);

    const handleEdit = (id) => {
        setSelectedId(id);
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this room?')) return;

        try {
            await axios.delete(`${BaseUrl}/rooms/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*'
                }
            });
            setRooms(prev => prev.filter(room => room.id !== id));
            setMessage('✅ Room deleted successfully.');
        } catch (error) {
            console.error('Delete failed:', error);
            setMessage('❌ Failed to delete room.');
        }
    };

    if(selectedId !== null){
        return (
            <EditRoom id = {selectedId}/>
        );
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">📋 All Rooms</h3>

            {message && (
                <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="d-none d-md-block">
                        <table className="table table-bordered table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Room Number</th>
                                    <th>Status</th>
                                    <th>Capacity</th>
                                    <th>Facility ID</th>
                                    <th>Room Type ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map(room => (
                                    <tr key={room.id}>
                                        <td>{room.id}</td>
                                        <td>{room.room_number}</td>
                                        <td>{room.status}</td>
                                        <td>{room.capacity}</td>
                                        <td>{room.facility_id}</td>
                                        <td>{room.room_type_id}</td>
                                        <td>
                                            <button className="btn btn-sm btn-warning me-2">Edit</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(room.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards View */}
                    <div className="d-md-none">
                        {rooms.map(room => (
                            <div className="card mb-3 shadow-sm" key={room.id}>
                                <div className="card-body">
                                    <h5 className="card-title">Room #{room.room_number}</h5>
                                    <p className="card-text"><strong>Status:</strong> {room.status}</p>
                                    <p className="card-text"><strong>Capacity:</strong> {room.capacity}</p>
                                    <p className="card-text"><strong>Facility ID:</strong> {room.facility_id}</p>
                                    <p className="card-text"><strong>Room Type ID:</strong> {room.room_type_id}</p>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-sm btn-warning w-50" onClick={() => handleEdit(room.id)}>Edit</button>
                                        <button className="btn btn-sm btn-danger w-50" onClick={() => handleDelete(room.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ViewRooms;
