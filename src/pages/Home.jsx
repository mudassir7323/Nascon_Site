import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
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
  'Qawali1.jpeg',
  'Qawali2.jpg',
  'Qawali3.jpg',
  'Qawali4.jpg',
  'Qawali5.jpg',
]

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % QawaliNight.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
    <Link to="/events">
      <button className='btn_cards mt-4'>Register Now</button>
    </Link>
  </div>
</section>

    <section className="section4">
      <h2 className="section-title">Featured Events</h2>
      <div className="cards-container">
        <div className='card1'>
          <div className="card-img" style={{ backgroundImage: `url(/Qawali1.jpeg)` }}></div>
          <h1>Qawali Night</h1>
          <p>The Vibrant Qawali Night brings you closer to the soul of Traditional Music</p>
          <p className="event-date">October 15, 2023 | 7:00 PM</p>
          <Link to="/events">
            <button className='btn_cards'>Get Tickets</button>
          </Link>
        </div>

        <div className='card1'>
          <div className="card-img" style={{ backgroundImage: `url(/concert.jpg)` }}></div>
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
        <div className='box1'>
          <h3>Contact Us</h3>
          <p>We'd be glad to hear from you!</p>
          <div className="contact-item">
            <i className="bi bi-envelope"></i>
            <a href='mailto:info@nascon.com.pk'>info@nascon.com.pk</a>
          </div>
          <div className="contact-item">
            <i className="bi bi-question-circle"></i>
            <a href='mailto:web-support@nascon.com.pk'>web-support@nascon.com.pk</a>
          </div>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
            <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
            <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
            <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>

        <div className='box1'>
          <h3>Quick Links</h3>
          <div className="footer-links">
            <Link to="/"><i className="bi bi-house-door"></i> Home</Link>
            <Link to="/events"><i className="bi bi-calendar-event"></i> Events</Link>
            <Link to="/about"><i className="bi bi-info-circle"></i> About</Link>
            <Link to="/sponsors"><i className="bi bi-briefcase"></i> Sponsors</Link>
          </div>
        </div>

        <div className='box2'>
          <h3>Become a Sponsor</h3>
          <p>Join NASCON as a sponsor and connect with talented students and professionals from across the country.</p>
          <Link to="/sponsors">
            <button className='btn_cards'>Sponsor Us</button>
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NASCON. All Rights Reserved.</p>
      </div>
    </section>
</>
  );
}

export default Home;
