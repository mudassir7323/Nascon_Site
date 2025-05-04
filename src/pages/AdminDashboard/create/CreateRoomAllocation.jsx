import { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

function CreateRoomAllocation() {
  const [formData, setFormData] = useState({
    request_id: 0,
    room_id: 0,
    check_in_time: '',
    check_out_time: '',
    total_cost: 0,
    payment_status: 'Pending',
    allocated_by: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes('cost') || name.includes('id') || name === 'allocated_by'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.post(`${BaseUrl}/room_allocations/`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Room Allocation Success:', response.data);
      alert('Room allocated successfully!');
    } catch (error) {
      console.error('Room Allocation Failed:', error);
      alert('Failed to allocate room.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Create Room Allocation</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Request ID</label>
                  <input
                    type="number"
                    name="request_id"
                    className="form-control"
                    placeholder="Enter Request ID"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Room ID</label>
                  <input
                    type="number"
                    name="room_id"
                    className="form-control"
                    placeholder="Enter Room ID"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Check-in Time</label>
                  <input
                    type="datetime-local"
                    name="check_in_time"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Check-out Time</label>
                  <input
                    type="datetime-local"
                    name="check_out_time"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Total Cost</label>
                  <input
                    type="number"
                    name="total_cost"
                    className="form-control"
                    placeholder="Enter Total Cost"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Payment Status</label>
                  <select
                    name="payment_status"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Allocated By (User ID)</label>
                  <input
                    type="number"
                    name="allocated_by"
                    className="form-control"
                    placeholder="Enter Allocator's User ID"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Allocate Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomAllocation;
