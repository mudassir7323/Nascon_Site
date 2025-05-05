import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import EditEventSchedule from '../edit/EditEventSchedule';

function ViewEventSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSchedules, setTotalSchedules] = useState(0);
  const pageSize = 10;

  const token = localStorage.getItem('access_token');

  const fetchSchedules = async (page) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/event-schedules/?skip=${(page - 1) * pageSize}&limit=${pageSize}&event_id=1&venue_id=1`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSchedules(response.data.schedules); 
      setTotalSchedules(response.data.total);
    } catch (err) {
      console.error('Error fetching schedules:', err);
    }
  };
  

  useEffect(() => {
    fetchSchedules(currentPage);
  }, [currentPage]);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage * pageSize < totalSchedules) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleEdit = (id) => {
    setSelectedId(id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) return;

    try {
      await axios.delete(`${BaseUrl}/event-schedules/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Schedule deleted successfully!');
      fetchSchedules(currentPage);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete schedule.');
    }
  };

  const handleBackToList = () => {
    setSelectedId(null);
    fetchSchedules(currentPage);
  };

  if (selectedId !== null) {
    return <EditEventSchedule id={selectedId} onBack={handleBackToList} />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Event Schedules</h4>
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
            disabled={currentPage * pageSize >= totalSchedules}
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
                <th>ID</th>
                <th>Event Name</th>
                <th>Venue Name</th>
                <th>Round Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.event_name}</td>
                  <td>{s.venue_name}</td>
                  <td>{s.round_name}</td>
                  <td>{s.start_time}</td>
                  <td>{s.end_time}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(s.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(s.id)}
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
        {schedules.map((s) => (
          <div key={s.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Schedule #{s.id}</h5>
              <p className="card-text">
                <strong>Event ID:</strong> {s.event_id}<br />
                <strong>Venue ID:</strong> {s.venue_id}<br />
                <strong>Round:</strong> {s.round_name}<br />
                <strong>Start:</strong> {s.start_time}<br />
                <strong>End:</strong> {s.end_time}
              </p>
              <div>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(s.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(s.id)}
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

export default ViewEventSchedules;
