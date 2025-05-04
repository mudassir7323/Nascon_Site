import { useEffect, useState } from 'react';
import BaseUrl from '../../../BaseUrl';
import axios from 'axios';

function ViewRoomAllocations() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllocations = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.get(`${BaseUrl}/room_allocations/?skip=0&limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllocations(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch room allocations:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this allocation?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${BaseUrl}/room_allocations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllocations((prev) => prev.filter((item) => item.id !== id));
      alert('Deleted successfully!');
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete allocation.');
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading room allocations...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Room Allocations</h2>

      {/* Desktop View */}
      <div className="d-none d-md-block">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Request ID</th>
              <th>Room ID</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Total Cost</th>
              <th>Payment Status</th>
              <th>Allocated By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((alloc) => (
              <tr key={alloc.id}>
                <td>{alloc.id}</td>
                <td>{alloc.request_id}</td>
                <td>{alloc.room_id}</td>
                <td>{new Date(alloc.check_in_time).toLocaleString()}</td>
                <td>{new Date(alloc.check_out_time).toLocaleString()}</td>
                <td>{alloc.total_cost}</td>
                <td>{alloc.payment_status}</td>
                <td>{alloc.allocated_by}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(alloc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="d-block d-md-none">
        {allocations.map((alloc) => (
          <div key={alloc.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Room ID: {alloc.room_id}</h5>
              <p className="card-text">
                <strong>Request ID:</strong> {alloc.request_id}<br />
                <strong>Check-in:</strong> {new Date(alloc.check_in_time).toLocaleString()}<br />
                <strong>Check-out:</strong> {new Date(alloc.check_out_time).toLocaleString()}<br />
                <strong>Total Cost:</strong> {alloc.total_cost}<br />
                <strong>Payment Status:</strong> {alloc.payment_status}<br />
                <strong>Allocated By:</strong> {alloc.allocated_by}
              </p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(alloc.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewRoomAllocations;
