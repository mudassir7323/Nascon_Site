import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function ViewTeams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('access_token');

    const fetchTeams = async () => {
        try {
            const res = await axios.get(`${BaseUrl}/teams/?skip=0&limit=100`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setTeams(res.data.teams);
        } catch (err) {
            console.error('Failed to fetch teams:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this team?');
        if (!confirm) return;

        try {
            await axios.delete(`${BaseUrl}/teams/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setTeams(prev => prev.filter(team => team.id !== id));
        } catch (err) {
            console.error('Failed to delete team:', err);
            alert('Failed to delete team.');
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    if (loading) return <p className="p-4">Loading teams...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">View Teams</h2>

            {/* Desktop Table */}
            <div className="d-none d-md-block">
                <table className="table table-striped table-bordered rounded-lg overflow-hidden">
                    <thead className="bg-light">
                        <tr>
                            <th className="text-left">Team Name</th>
                            <th className="text-left">Event ID</th>
                            <th className="text-left">Created At</th>
                            <th className="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id}>
                                <td className="py-2">{team.team_name}</td>
                                <td className="py-2">{team.event_id}</td>
                                <td className="py-2">{new Date(team.created_at).toLocaleString()}</td>
                                <td className="py-2">
                                    <button
                                        onClick={() => handleDelete(team.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="d-md-none">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="card mb-4"
                    >
                        <div className="card-body">
                            <p><strong>Team Name:</strong> {team.team_name}</p>
                            <p><strong>Event ID:</strong> {team.event_id}</p>
                            <p><strong>Created At:</strong> {new Date(team.created_at).toLocaleString()}</p>
                            <button
                                onClick={() => handleDelete(team.id)}
                                className="btn btn-danger mt-3 w-100"
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

export default ViewTeams;
