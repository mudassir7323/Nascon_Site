import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
// import img1 from './img1.jpeg'
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
  return (
    <>

    <section className="section1">
  <div className='overlay'></div>
  <div className='section1-content'> 
    <h1>Welcome to NASCON</h1>
    <p>The Ultimate Destination for Festivals & Events</p>
    <button className='btn1'>Explore Nascon</button>
  </div>
  
</section>
<section className='section3'>
  <div className='slideshow'>
    <h1>Register For Qawali Night Or Concerts</h1>
  </div>
</section>

    <section className="section4">
      <div className='card1'>
      <h1>Qawali Night</h1>
      <p>The Vibrant Qawali Night<br/>
          Brings you closer to the soul Of Traditional Music </p>
          <button className='btn_cards'>Get Tickets</button>
      </div>
      

      <div className='card1'>
        <img></img>
      <h1 >The Electrifying Concert</h1>
      <p>Feel the rhythm,<br/> live the moment, and lose yourself in the sound.</p>
      <button className='btn_cards'>Get Tickets</button>
      </div>
    </section>

    <section className='section5'>
      <div >
      <h1>Event Organisers</h1>
      </div>
    </section>


    <section className='section6'>
    <div className="gallery">
      {SocitalPics.map((imgName, index) => (
        <div key={index} className="gallery-item">
          <img
            src={`/${imgName}`}
            alt={`Slide ${index}`}
            className="gallery-image"
          />
        </div>
      ))}
    </div>
    </section>

    <section className='section7'>
      <div className='box1'>
        <h1>Reach Us Out</h1>
      <p>We'd be glad to hear from you!<br/>
        info<a href='#'>@nascon.com.pk</a><br/>
        For any website related query<br/>
        web-support<a href ='#'>@nascon.com.pk</a></p>
      </div>

      <div className='box1'>
      <h1>Navigate</h1>
        <a href='#'>Home</a><br/>
        <a href='#'>Events</a><br/>
        <a href='#'>About</a><br/>
        <a href='#'>Sponsers</a><br/>
      </div>

      <div className='box2'>
      <h1>Become a Sponser</h1>
      <p>We'll be glad if you become a part of!<br/>
          Nascon<br/>
        Please Click On the button for further Details</p>
       <button className='btn_cards'>Be a Sponser</button>
      </div>
    </section>
</>
  );
}

export default Home;
