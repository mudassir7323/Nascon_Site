import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

function ViewEventRegistration() {
  const [registrations, setRegistrations] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const baseUrl = BaseUrl;
  const accessToken = localStorage.getItem('access_token');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${baseUrl}/event-registrations/`, {
          params: { skip: 0, limit: 100 },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRegistrations(response.data.registrations || []);
      } catch (err) {
        console.error('Error fetching event registrations:', err);
        setError('Failed to load registrations.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [accessToken, baseUrl]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this registration?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseUrl}/event-registrations/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Failed to delete registration.');
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(
        `${baseUrl}/event-registrations/${id}/payment/Paid`,
        {},
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === id ? { ...reg, payment_status: 'Paid' } : reg
        )
      );
    } catch (error) {
      console.error('Error approving registration:', error);
      alert('Failed to approve registration.');
    }
  };

  if (loading) {
    return <div className="container mt-4">Loading registrations...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Event Registrations</h2>

      {!isMobile ? (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Event ID</th>
              <th>User ID</th>
              <th>Team ID</th>
              <th>Status</th>
              <th>Confirmation Code</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td>{reg.event_id}</td>
                <td>{reg.user_id}</td>
                <td>{reg.team_id ?? 'N/A'}</td>
                <td>{reg.payment_status}</td>
                <td>{reg.confirmation_code}</td>
                <td>{new Date(reg.registration_date).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(reg.id)}
                    disabled={reg.payment_status === 'Paid'}
                  >
                    <i className="bi bi-check-circle-fill"></i> Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(reg.id)}
                  >
                    <i className="bi bi-trash-fill"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row row-cols-1 g-3">
          {registrations.map((reg) => (
            <div key={reg.id} className="col">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Registration ID: {reg.id}</h5>
                  <p className="card-text"><strong>Event ID:</strong> {reg.event_id}</p>
                  <p className="card-text"><strong>User ID:</strong> {reg.user_id}</p>
                  <p className="card-text"><strong>Team ID:</strong> {reg.team_id ?? 'N/A'}</p>
                  <p className="card-text"><strong>Status:</strong> {reg.payment_status}</p>
                  <p className="card-text"><strong>Confirmation:</strong> {reg.confirmation_code}</p>
                  <p className="card-text"><strong>Date:</strong> {new Date(reg.registration_date).toLocaleString()}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprove(reg.id)}
                      disabled={reg.payment_status === 'Paid'}
                    >
                      <i className="bi bi-check-circle-fill"></i> Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(reg.id)}
                    >
                      <i className="bi bi-trash-fill"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewEventRegistration;