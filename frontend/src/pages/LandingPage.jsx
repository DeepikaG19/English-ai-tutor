import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth.css';
import heroImg from '../assets/hero.png'; // Assuming there is a hero.png

export default function LandingPage() {
  const navigate = useNavigate();

  const renderLetters = (word, colors) => {
    return word.split('').map((char, index) => (
      <span key={index} className={`letter-box ${colors[index % colors.length]}`}>
        {char}
      </span>
    ));
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-card-content">
          <div className="landing-title">
            <div className="landing-row">
              {renderLetters("it's", ['color-orange', 'color-red', 'color-yellow', 'color-blue'])}
            </div>
            <div className="landing-row">
              {renderLetters("time", ['color-yellow', 'color-green', 'color-orange', 'color-purple'])}
            </div>
            <div className="landing-row">
              {renderLetters("To", ['color-blue', 'color-orange'])}
              <span style={{margin: '0 5px'}}></span>
              {renderLetters("learn", ['color-green', 'color-yellow', 'color-red', 'color-purple', 'color-orange'])}
            </div>
            <div className="landing-row">
              {renderLetters("ENGLISH", ['color-green', 'color-purple', 'color-red', 'color-blue', 'color-yellow', 'color-orange', 'color-red'])}
            </div>
          </div>
          
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Start Learning
          </button>
        </div>
        
        <div className="auth-card-image-container">
          <img src={heroImg} alt="Learning English" className="auth-card-image" />
        </div>
      </div>
    </div>
  );
}
