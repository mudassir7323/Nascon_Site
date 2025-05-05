import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function ViewEventRegistrationUSER() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = BaseUrl;
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchMyRegistrations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${baseUrl}/event-registrations/my-registrations?skip=0&limit=100`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setRegistrations(response.data.registrations || []); // Directly use response.data.registrations
      } catch (err) {
        console.error('Error fetching event registrations:', err);
        setError('Failed to load your event registrations.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyRegistrations();
  }, [accessToken, baseUrl]);

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading your event registrations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <p className="alert alert-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>My Event Registrations</h2>
      {registrations.length === 0 ? (
        <p>You haven't registered for any events yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Event ID</th> {/* Displaying event_id for now */}
              <th>Registration Date</th>
              <th>Team ID</th> {/* Displaying team_id for now */}
              <th>Payment Status</th>
              <th>Confirmation Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration.id}>
                <td>{registration.event_id}</td> {/* Displaying event_id */}
                <td>{new Date(registration.registration_date).toLocaleDateString()}</td>
                <td>{registration.team_id || 'N/A'}</td> {/* Displaying team_id */}
                <td>{registration.payment_status}</td>
                <td>{registration.confirmation_code}</td>
                <td>
                  {/* You can add action buttons here */}
                  <button className="btn btn-sm btn-outline-info me-2" disabled>View Details</button>
                  {/* Add a cancellation button or other actions as needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewEventRegistrationUSER;