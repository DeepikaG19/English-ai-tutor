import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../auth.css';
import heroImg from '../assets/hero.png';

export default function LevelSelectionPage() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const handleNext = () => {
    navigate('/chat', { state: { level: selectedLevel } });
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-card-content" style={{ order: 1, paddingRight: '20px', position: 'relative' }}>
          <button 
            onClick={() => navigate('/mode')} 
            style={{ position: 'absolute', top: '-10px', left: '0px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <ArrowLeft size={20} /> <span style={{fontSize: '14px', fontWeight: '500'}}>Back</span>
          </button>
          <h2 className="auth-title" style={{marginTop: '25px'}}>Choose Your Level</h2>
          
          <div className="level-buttons">
            <button 
              className={`level-button ${selectedLevel === 'beginner' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('beginner')}
            >
              <span>Beginner</span>
              {selectedLevel === 'beginner' && <span>★</span>}
            </button>
            <button 
              className={`level-button ${selectedLevel === 'intermediate' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('intermediate')}
            >
              <span>Intermediate</span>
              {selectedLevel === 'intermediate' && <span>★★</span>}
            </button>
            <button 
              className={`level-button ${selectedLevel === 'advanced' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('advanced')}
            >
              <span>Advanced</span>
              {selectedLevel === 'advanced' && <span>★★★</span>}
            </button>
            
            <button className="btn-primary" onClick={handleNext} style={{maxWidth: '350px'}}>
              Start Chatting
            </button>
          </div>
        </div>
        
        <div className="auth-card-image-container" style={{ order: 2 }}>
          <img src={heroImg} alt="Student" className="auth-card-image" />
        </div>
      </div>
    </div>
  );
}
