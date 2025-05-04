import React, { useEffect, useState } from 'react';
import BaseUrl from '../../BaseUrl';

function EditRoom({ id }) {
    const [formData, setFormData] = useState({
        status: '',
        capacity: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`${BaseUrl}/rooms/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setFormData({
                    status: data.status || '',
                    capacity: data.capacity || 0
                });
            } catch (error) {
                console.error('Error fetching room details:', error);
            }
        };

        fetchRoomDetails();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${BaseUrl}/rooms/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    status: formData.status,
                    capacity: parseInt(formData.capacity)
                })
            });

            if (!response.ok) throw new Error('Failed to update room');

            setMessage('✅ Room updated successfully!');
        } catch (error) {
            console.error('Update failed:', error);
            setMessage('❌ Failed to update room.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">✏️ Edit Room</h3>

            {message && (
                <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm">
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

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Room'}
                </button>
            </form>
        </div>
    );
}

export default EditRoom;
