import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

function ViewEventRegistration() {
  const [registrations, setRegistrations] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const baseUrl = BaseUrl;
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event-registrations/`, {
          params: { skip: 0, limit: 100 },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRegistrations(response.data.registrations || []);
      } catch (error) {
        console.error('Error fetching event registrations:', error);
      }
    };

    fetchRegistrations();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Event Registrations</h2>

      {!isMobile ? (
        // Table for desktop
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Event ID</th>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Team ID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Confirmation Code</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td className="border px-4 py-2">{reg.event_id}</td>
                <td className="border px-4 py-2">{reg.user_id}</td>
                <td className="border px-4 py-2">{reg.team_id ?? 'N/A'}</td>
                <td className="border px-4 py-2">{reg.payment_status}</td>
                <td className="border px-4 py-2">{reg.confirmation_code}</td>
                <td className="border px-4 py-2">
                  {new Date(reg.registration_date).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(reg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Cards for mobile
        <div className="space-y-4">
          {registrations.map((reg) => (
            <div key={reg.id} className="border rounded-lg p-4 shadow">
              <p><strong>Event ID:</strong> {reg.event_id}</p>
              <p><strong>User ID:</strong> {reg.user_id}</p>
              <p><strong>Team ID:</strong> {reg.team_id ?? 'N/A'}</p>
              <p><strong>Status:</strong> {reg.payment_status}</p>
              <p><strong>Confirmation:</strong> {reg.confirmation_code}</p>
              <p><strong>Date:</strong> {new Date(reg.registration_date).toLocaleString()}</p>
              <button
                className="text-red-600 mt-2 underline"
                onClick={() => handleDelete(reg.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewEventRegistration;
