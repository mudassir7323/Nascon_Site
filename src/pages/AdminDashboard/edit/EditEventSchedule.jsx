import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

function EditEventSchecule({ id, onBack }) {
    const [formData, setFormData] = useState({
        event_id: '',
        venue_id: '',
        start_time: '',
        end_time: '',
        round_name: ''
    });

    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('access_token'); // Get token from storage

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/event-schedules/${id}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                });
                const data = response.data;
                setFormData({
                    event_id: data.event_id || '',
                    venue_id: data.venue_id || '',
                    start_time: data.start_time ? data.start_time.slice(0, 16) : '',
                    end_time: data.end_time ? data.end_time.slice(0, 16) : '',
                    round_name: data.round_name || ''
                });
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch schedule:', error);
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [id, accessToken]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${BaseUrl}/event-schedules/${id}`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
            });
            alert('Event schedule updated successfully!');
            if (onBack) onBack();
        } catch (error) {
            console.error('Update failed:', error.response?.data || error.message);
            alert('Failed to update schedule. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h4>Edit Event Schedule</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Event ID</label>
                    <input
                        type="number"
                        className="form-control"
                        name="event_id"
                        value={formData.event_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Venue ID</label>
                    <input
                        type="number"
                        className="form-control"
                        name="venue_id"
                        value={formData.venue_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Start Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">End Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Round Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="round_name"
                        value={formData.round_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">
                        Update Schedule
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onBack}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditEventSchecule;
