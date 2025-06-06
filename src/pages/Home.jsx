import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../BaseUrl';

const SocitalPics = [
  'FAOS.jpeg',
  'FAS.jpeg',
  'FCompS.jpeg',
  'FCS.jpeg',
  'FDS.jpeg',
  'FDSS.jpeg',
  'FES.jpeg',
  'FFTS.jpeg',
  'FGDS.jpeg',
  'FIEEE.jpeg',
  'FMC.jpeg',
  'FMS.jpeg'
];

const QawaliNight = [
  'Qawali1.JPG',
  'Qawali2.JPG',
  'Qawali3.JPG',
  'Qawali4.JPG',
  'Qawali5.JPG',
]

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('access_token');

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % QawaliNight.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/events/public?skip=0&limit=4`, {
        headers: {
          Accept: 'application/json',
        }
      });
      setEvents(res.data.events);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p className="p-4">Loading events...</p>;

  return (
    <>
      <section className="section1">
        <div className='overlay'></div>
        <div className='section1-content'>
          <h1>Welcome to NASCON</h1>
          <p>The Ultimate Destination for Festivals & Events</p>
          <p className="hero-subtitle">Join us for an unforgettable experience of music, culture, and innovation</p>
          <Link to="/about">
            <button className='btn1'>Explore Nascon</button>
          </Link>
        </div>
      </section>

      <section className='section3'>
        <div className='slideshow-container'>
          <h1>Register For Qawali Night Or Concerts</h1>
          <div className='slideshow'>
            {QawaliNight.map((image, index) => (
              <div
                key={index}
                className="slide"
                style={{
                  backgroundImage: `url(/${image})`,
                  display: currentSlide === index ? 'block' : 'none'
                }}
              />
            ))}
            <div className="slideshow-dots">
              {QawaliNight.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Display events */}
        <div className="events-container">
          <h2>Featured Events</h2>
          {events.length > 0 ? (
            <div className="cards-container">
              {events.map((event) => (
                <div key={event.id} className="card1">
                  <div className="card-img" />
                  <h1>{event.event_name}</h1>
                  <p>{event.description}</p>
                  <p className="event-date">{new Date(event.registration_deadline).toLocaleDateString()} | {event.max_participants} Participants</p>
                  <Link to="/events">
                    <button className='btn_cards'>Get Tickets</button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No events available.</p>
          )}
          <Link to="/events">
            <button className='btn_cards mt-4'>Show More</button>
          </Link>
        </div>
      </section>

      <section className="section4">
        <h2 className="section-title">Featured Events</h2>
        <div className="cards-container">
          {/* Static Event Cards */}
          <div className='card1'>
            <div className="card-img" style={{ backgroundImage: `url(/Qawali1.JPG)` }}></div>
            <h1>Qawali Night</h1>
            <p>The Vibrant Qawali Night brings you closer to the soul of Traditional Music</p>
            <p className="event-date">October 15, 2023 | 7:00 PM</p>
            <Link to="/events">
              <button className='btn_cards'>Get Tickets</button>
            </Link>
          </div>

          <div className='card1'>
            <div className="card-img" style={{ backgroundImage: `url(/img2.jpg)` }}></div>
            <h1>The Electrifying Concert</h1>
            <p>Feel the rhythm, live the moment, and lose yourself in the sound.</p>
            <p className="event-date">October 20, 2023 | 8:00 PM</p>
            <Link to="/events">
              <button className='btn_cards'>Get Tickets</button>
            </Link>
          </div>
        </div>
      </section>

      <section className='section5'>
        <div className="organizers-header">
          <h2 className="section-title">Event Organizers</h2>
          <p className="organizers-description">
            NASCON is proudly organized by the following societies and departments.
            Each brings unique expertise and passion to create an unforgettable experience.
          </p>
        </div>
      </section>

      <section className='section6'>
        <div className="gallery">
          {SocitalPics.map((imgName, index) => (
            <div key={index} className="gallery-item">
              <img
                src={`/${imgName}`}
                alt={`Society ${index + 1}`}
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="gallery-text">View Details</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='section7'>
        <div className="footer-container">
          {/* Footer Content */}
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NASCON. All Rights Reserved.</p>
        </div>
      </section>
    </>
  );
}

export default Home;
