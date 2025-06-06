import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import BaseUrl from '../BaseUrl';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RegisterEvents from './RegiterEvents'; 

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const baseUrl = BaseUrl;
  const accessToken = localStorage.getItem("access_token");

  console.log("Initial selectedId:", selectedId); // Debugging line

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/events/`, {
            params: {
              skip: (currentPage - 1) * 10,
              limit: 10
            },
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

        setEvents(response.data.events);
        setTotalEvents(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentPage]);

  const totalPages = Math.ceil(totalEvents / 10);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEventClick = (id) => {
    console.log("Get Tickets clicked for event ID:", id); // Debugging line
    setSelectedId(id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (selectedId !== null) {
    return (
      <RegisterEvents id={selectedId} /> // Renamed component usage
    );
  }

  return (
    <>
      <section className="section4">
        <h2 className="section-title">Featured Events</h2>
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <div className="cards-container">
            {events.map((event) => (
              <div className="card1" key={event.id}>
                <div className="card-img" style={{ backgroundColor: '#f4f4f4' }}></div>
                <h1>{event.event_name}</h1>
                <p>{event.description}</p>
                <p className="event-date">{new Date(event.registration_deadline).toLocaleString()}</p>
                
                  <button
                    className="btn_cards"
                    onClick={() => handleEventClick(event.id)}
                  >
                    Get Tickets
                  </button>
                
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {totalEvents > 10 && !loading && (
          <Link to="/events">
            <button className="btn_cards mt-4">Show More</button>
          </Link>
        )}
      </section>
    </>
  );
}

export default Events;