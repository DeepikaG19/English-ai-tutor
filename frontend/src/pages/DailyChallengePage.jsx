import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Gem, ArrowRight } from 'lucide-react';
import '../auth.css';
import heroImg from '../assets/hero.png';

export default function DailyChallengePage() {
  const navigate = useNavigate();
  const [dailyQuiz, setDailyQuiz] = useState(null);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState(null);
  const [hasAttemptedToday, setHasAttemptedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const username = localStorage.getItem('currentUser') || 'guest';

  useEffect(() => {
    if (username === 'guest') {
      navigate('/login');
    } else {
      fetchDailyQuiz();
    }
  }, [username, navigate]);

  const fetchDailyQuiz = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/daily-quiz?username=${username}`);
      setDailyQuiz(res.data);
      setStreak(res.data.streak);
      setHasAttemptedToday(res.data.hasAttemptedToday);
      
      // If already attempted, maybe we just show their streak and a continue button
    } catch (err) {
      console.error('Failed to fetch daily quiz', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!selectedOption) return;
    try {
      const res = await axios.post('http://localhost:3000/api/submit-quiz', {
        username,
        answer: selectedOption,
        date: dailyQuiz.date
      });
      setResult(res.data);
      setStreak(res.data.streak);
      setHasAttemptedToday(true);
    } catch (err) {
      console.error('Failed to submit quiz', err);
    }
  };

  if (isLoading) {
    return <div className="auth-page-wrapper"><div style={{color: '#fff'}}>Loading Daily Challenge...</div></div>;
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-card-content" style={{ order: 1, paddingRight: '20px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 className="auth-title" style={{ margin: 0, fontSize: '1.8rem' }}>
              <Gem color="#00d2ff" size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              Daily Challenge
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 0, 0, 0.25)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <Gem color="#00d2ff" size={18} />
              <span style={{ fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', fontSize: '0.95rem' }}>{streak} Day Streak</span>
            </div>
          </div>

          {!hasAttemptedToday && !result && dailyQuiz && (
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '25px' }}>
                <span style={{ fontSize: '0.85rem', color: '#00d2ff', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Level: {dailyQuiz.level}</span>
                <h3 style={{ margin: '10px 0 0 0', fontSize: '1.4rem', color: '#fff', lineHeight: '1.4' }}>{dailyQuiz.question}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dailyQuiz.options.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedOption(opt)}
                    style={{ 
                      padding: '16px 20px', 
                      borderRadius: '12px', 
                      background: selectedOption === opt ? 'rgba(52, 152, 219, 0.3)' : 'rgba(255,255,255,0.05)', 
                      border: selectedOption === opt ? '2px solid #3498db' : '2px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={handleSubmitQuiz}
                disabled={!selectedOption}
                style={{ 
                  width: '100%',
                  marginTop: '30px', 
                  padding: '16px', 
                  background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '28px', 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold', 
                  cursor: selectedOption ? 'pointer' : 'not-allowed',
                  opacity: selectedOption ? 1 : 0.5,
                  transition: 'opacity 0.2s'
                }}
              >
                Submit Answer
              </button>
            </div>
          )}

          {(hasAttemptedToday || result) && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'fadeIn 0.5s ease' }}>
              {result ? (
                <>
                  <div style={{ fontSize: '4rem', marginBottom: '15px', textAlign: 'center' }}>
                    {result.isCorrect ? '🎉' : '❌'}
                  </div>
                  <h3 style={{ color: result.isCorrect ? '#2ecc71' : '#e74c3c', fontSize: '1.8rem', margin: '0 0 20px 0', textAlign: 'center' }}>
                    {result.isCorrect ? 'Correct!' : 'Incorrect!'}
                  </h3>
                  
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Correct Answer:</span> <br/>
                      <strong style={{ color: '#fff', fontSize: '1.2rem' }}>{result.correctAnswer}</strong>
                    </p>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: '1.5' }}>
                      {result.explanation}
                    </p>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🌟</div>
                  <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 10px 0' }}>You're all caught up!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>You've already completed today's challenge. Come back tomorrow to keep your streak going!</p>
                </div>
              )}

              <button 
                onClick={() => navigate('/mode')}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%', 
                  padding: '16px', 
                  background: 'rgba(255,255,255,0.15)', 
                  color: '#fff', 
                  border: '1px solid rgba(255,255,255,0.3)', 
                  borderRadius: '28px', 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
              >
                Continue to Dashboard <ArrowRight size={20} />
              </button>
            </div>
          )}

        </div>
        
        <div className="auth-card-image-container" style={{ order: 2 }}>
          <img src={heroImg} alt="Student" className="auth-card-image" />
        </div>
      </div>
    </div>
  );
}
