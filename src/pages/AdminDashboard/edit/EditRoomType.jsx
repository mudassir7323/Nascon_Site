import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../BaseUrl';
import axios from 'axios';


function EditRoomType({ id }) {
    const [formData, setFormData] = useState({
        type_name: '',
        description: '',
        capacity: 0,
        price_per_night: 0,
        amenities: '',
        facility_id: 0,
    });

    const token = localStorage.getItem('access_token');
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // Fetch existing room type
    useEffect(() => {
        const fetchRoomType = async () => {
            try {
                const res = await axios.get(`${BaseUrl}/room_types/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(res.data);
            } catch (error) {
                console.error("Failed to fetch room type:", error);
            }
        };

        if (id) fetchRoomType();
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'capacity' || name === 'price_per_night' || name === 'facility_id'
                ? parseInt(value)
                : value,
        }));
    };

    // Handle update submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BaseUrl}/room_types/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            alert("Room type updated successfully!");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update room type.");
        }
    };
    


    return (
        <div className="container mt-4">
            <h3>Edit Room Type</h3>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Type Name</label>
                    <input
                        type="text"
                        name="type_name"
                        className="form-control"
                        value={formData.type_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Capacity</label>
                    <input
                        type="number"
                        name="capacity"
                        className="form-control"
                        value={formData.capacity}
                        onChange={handleChange}
                        min={1}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price Per Night</label>
                    <input
                        type="number"
                        name="price_per_night"
                        className="form-control"
                        value={formData.price_per_night}
                        onChange={handleChange}
                        min={0}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Amenities</label>
                    <input
                        type="text"
                        name="amenities"
                        className="form-control"
                        value={formData.amenities}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Facility ID</label>
                    <input
                        type="number"
                        name="facility_id"
                        className="form-control"
                        value={formData.facility_id}
                        onChange={handleChange}
                        min={0}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update Room Type</button>
            </form>
        </div>
    );
}

export default EditRoomType;
