import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/home-page.css';

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Organize Your Job Search Journey</h1>
            <p>Track applications, prepare for interviews, and never miss important deadlines</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn primary">Get Started</Link>
              <Link to="/login" className="btn secondary">Log In</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;