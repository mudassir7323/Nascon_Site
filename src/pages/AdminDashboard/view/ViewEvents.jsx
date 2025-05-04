import { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.get(`${BaseUrl}/events/?skip=0&limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the data is an array
      const data = response.data;
      if (Array.isArray(data)) {
        setEvents(data);
      } else if (Array.isArray(data?.events)) {
        setEvents(data.events); // Adjust if API wraps in an `events` key
      } else {
        console.error('Unexpected response:', data);
        alert('Unexpected response format while fetching events.');
        setEvents([]); // Fallback to empty array
      }

    } catch (error) {
      console.error('Failed to fetch events:', error);
      alert('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`${BaseUrl}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete event');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">View Events</h3>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="d-none d-md-block">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Fee</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.event_name}</td>
                    <td>{event.category_id || 'N/A'}</td>
                    <td>{event.created_at || 'N/A'}</td>
                    <td>{event.registration_fee || 'N/A'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(event.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="d-md-none">
            {events.map((event) => (
              <div key={event.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">
                    <strong>Name:</strong> {event.event_name || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {event.created_at || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Fee:</strong> {event.registration_fee || 'N/A'}
                  </p>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewEvents;
