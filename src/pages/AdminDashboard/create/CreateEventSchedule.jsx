import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../BaseUrl';
import axios from 'axios';

function CreateEventSchedule() {
  const [venues, setVenues] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState("");
  const [eventId, setEventId] = useState("");
  const [roundName, setRoundName] = useState("Preliminary");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch venues
        const venuesResponse = await axios.get(`${BaseUrl}/venues/?skip=0&limit=100`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });
        setVenues(venuesResponse.data.venues);

        // Fetch unscheduled events
        const eventsResponse = await axios.get(`${BaseUrl}/events/unscheduled`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });
        setEvents(eventsResponse.data.events || []); // adjust key if necessary
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setMessage('Failed to load initial data. Please check your network connection.');
        setShowMessage(true);
      }
    };
    fetchInitialData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVenueId || !eventId || !startTime || !endTime || !roundName) {
      setMessage("Please fill in all fields.");
      setShowMessage(true);
      return;
    }

    const payload = {
      event_id: parseInt(eventId),
      venue_id: parseInt(selectedVenueId),
      start_time: startTime,
      end_time: endTime,
      round_name: roundName,
    };

    try {
      setLoading(true);
      setMessage('');
      setShowMessage(false);
      await axios.post(
        `${BaseUrl}/event-schedules/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      setMessage("Event Schedule created successfully!");
      setShowMessage(true);
      // Reset form fields
      setEventId('');
      setSelectedVenueId('');
      setRoundName('Preliminary');
      setStartTime('');
      setEndTime('');

    } catch (error) {
      console.error("Error creating event schedule:", error);
      setMessage(`Failed to create event schedule. ${error.response?.data?.message || 'Please check your input data.'}`);
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEventId('');
    setSelectedVenueId('');
    setRoundName('Preliminary');
    setStartTime('');
    setEndTime('');
    setMessage('');
    setShowMessage(false);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4">Create Event Schedule</h2>
          {showMessage && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
              {message}
              <button type="button" className="btn-close" onClick={() => setShowMessage(false)} aria-label="Close"></button>
            </div>
          )}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Event Dropdown */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select Event:</label>
                  <select
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                    className="form-select form-select-lg"
                    required
                  >
                    <option value="">Select an event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name || `Event #${event.id}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Venue:</label>
                  <select
                    value={selectedVenueId}
                    onChange={(e) => setSelectedVenueId(e.target.value)}
                    className="form-select form-select-lg"
                    required
                  >
                    <option value="">Select a venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.venue_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Start Time:</label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="form-control form-control-lg"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">End Time:</label>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="form-control form-control-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Round Name:</label>
                  <select
                    value={roundName}
                    onChange={(e) => setRoundName(e.target.value)}
                    className="form-select form-select-lg"
                    required
                  >
                    <option value="Preliminary">Preliminary</option>
                    <option value="Semi-Final">Semi-Final</option>
                    <option value="Final">Final</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg"
                  >
                    {loading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      "Create Schedule"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer bg-light p-3 d-flex justify-content-between align-items-center">
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                All fields are required
              </small>
              <small className="text-muted">&copy; {new Date().getFullYear()} Event Admin Panel</small>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="#" className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-arrow-left me-1"></i>
              Back to Schedules
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEventSchedule;
