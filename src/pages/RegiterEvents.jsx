import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function RegisterEvents({ id }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [userId, setUserId] = useState(null); // Assuming userId will be needed for submission
  const [message, setMessage] = useState('');
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [loadingEventDetails, setLoadingEventDetails] = useState(true);
  const [errorEventDetails, setErrorEventDetails] = useState(null);

  const baseUrl = BaseUrl;
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchTeams = async () => {
      setLoadingTeams(true);
      try {
        const response = await axios.get(`${baseUrl}/teams/my-teams`, {
          params: { skip: 0, limit: 100 },
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setTeams(response.data.teams || []);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setMessage('Failed to load teams.');
      } finally {
        setLoadingTeams(false);
      }
    };

    const fetchEventDetails = async () => {
      setLoadingEventDetails(true);
      setErrorEventDetails(null);
      try {
        const response = await axios.get(`${baseUrl}/events/public/${id}/details`, {
          headers: {
            accept: 'application/json',
          },
        });
        setEventDetails(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setErrorEventDetails('Failed to load event details.');
      } finally {
        setLoadingEventDetails(false);
      }
    };

    // Optional: get user_id from localStorage or a profile API
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) setUserId(parseInt(storedUserId));

    fetchTeams();
    fetchEventDetails();
  }, [accessToken, baseUrl, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setRegistrationLoading(true);
    setRegistrationSuccess(false);
    setRegistrationError(null);

    try {
      await axios.post(
        `${baseUrl}/event-registrations/`,
        {
          event_id: parseInt(id),
          user_id: userId,
          team_id: selectedTeamId ? parseInt(selectedTeamId) : null,
          payment_status: 'Pending',
          confirmation_code: 'CONF-' + Math.floor(Math.random() * 1000000) // Auto-generate
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage('Successfully registered for the event!');
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Error registering:', error);
      setRegistrationError('Failed to register. Please try again.');
      setMessage('Failed to register. Please try again.');
    } finally {
      setRegistrationLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          {loadingEventDetails ? (
            <h2 className="card-title mb-4">Loading Event Details...</h2>
          ) : errorEventDetails ? (
            <div className="alert alert-danger">{errorEventDetails}</div>
          ) : eventDetails ? (
            <>
              <h2 className="card-title mb-4">Register for {eventDetails.event_name}</h2>
              <p className="card-text"><strong>Description:</strong> {eventDetails.description}</p>
              <p className="card-text"><strong>Registration Deadline:</strong> {new Date(eventDetails.registration_deadline).toLocaleString()}</p>
              <p className="card-text"><strong>Registration Fee:</strong> {eventDetails.registration_fee}</p>
              {eventDetails.is_team_event && (
                <p className="card-text">
                  <strong>Team Size:</strong> {eventDetails.min_team_size} - {eventDetails.max_team_size} participants
                </p>
              )}
            </>
          ) : (
            <h2 className="card-title mb-4">Register for Event #{id}</h2>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="team" className="form-label">
                Select a Team (optional):
              </label>
              {loadingTeams ? (
                <p className="text-muted">Loading teams...</p>
              ) : (
                <select
                  className="form-select"
                  id="team"
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  disabled={eventDetails && !eventDetails.is_team_event}
                >
                  <option value="">-- No Team --</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
              )}
              {eventDetails && !eventDetails.is_team_event && (
                <small className="form-text text-muted">This is not a team event.</small>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={registrationLoading}
            >
              {registrationLoading ? 'Registering...' : 'Register'}
            </button>

            {message && (
              <div className={`mt-3 alert ${registrationSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
                {message}
              </div>
            )}
            {registrationError && (
              <div className="mt-3 alert alert-danger" role="alert">
                {registrationError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterEvents;