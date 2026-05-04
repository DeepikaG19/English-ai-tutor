import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MessageSquare, Briefcase, Gem, X, Mic } from 'lucide-react';
import '../auth.css';
import heroImg from '../assets/hero.png';

export default function ModeSelectionPage() {
  const navigate = useNavigate();
  const [dailyQuiz, setDailyQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState(null);
  const [hasAttemptedToday, setHasAttemptedToday] = useState(true);

  const username = localStorage.getItem('currentUser') || 'guest';

  useEffect(() => {
    if (username !== 'guest') {
      fetchDailyQuiz();
    }
  }, [username]);

  const fetchDailyQuiz = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/daily-quiz?username=${username}`);
      setDailyQuiz(res.data);
      setStreak(res.data.streak);
      setHasAttemptedToday(res.data.hasAttemptedToday);
      if (!res.data.hasAttemptedToday) {
        setShowModal(true);
      }
    } catch (err) {
      console.error('Failed to fetch daily quiz', err);
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

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ position: 'relative' }}>
        <div className="auth-card-content" style={{ order: 1, paddingRight: '20px', position: 'relative' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ position: 'absolute', top: '-10px', left: '0px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <ArrowLeft size={20} /> <span style={{fontSize: '14px', fontWeight: '500'}}>Back</span>
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', marginBottom: '40px' }}>
            <h2 className="auth-title" style={{ margin: 0 }}>Choose Your Path</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 0, 0, 0.25)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <Gem color="#00d2ff" size={20} />
              <span style={{ fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', fontSize: '0.95rem' }}>{streak} Day Streak</span>
            </div>
          </div>
          
          <div className="level-buttons" style={{ gap: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              className="level-button"
              onClick={() => navigate('/levels')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px', background: 'rgba(255, 255, 255, 0.25)', border: '2px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', padding: '20px 24px', maxWidth: '400px', width: '100%' }}
            >
              <div style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)', padding: '15px', borderRadius: '16px', display: 'flex', boxShadow: '0 5px 15px rgba(52, 152, 219, 0.4)' }}>
                <MessageSquare size={30} color="#fff" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Speaking Practice</span>
                <span style={{ fontSize: '15px', fontWeight: '500', color: 'rgba(255,255,255,0.9)', marginTop: '4px' }}>Practice based on your level</span>
              </div>
            </button>

            <button 
              className="level-button"
              onClick={() => navigate('/speak-free')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px', background: 'rgba(255, 255, 255, 0.25)', border: '2px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', padding: '20px 24px', maxWidth: '400px', width: '100%' }}
            >
              <div style={{ background: 'linear-gradient(135deg, #2ecc71, #27ae60)', padding: '15px', borderRadius: '16px', display: 'flex', boxShadow: '0 5px 15px rgba(46, 204, 113, 0.4)' }}>
                <Mic size={30} color="#fff" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Speak Free</span>
                <span style={{ fontSize: '15px', fontWeight: '500', color: 'rgba(255,255,255,0.9)', marginTop: '4px' }}>Free-form AI conversation</span>
              </div>
            </button>

            <button 
              className="level-button"
              onClick={() => navigate('/interview')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px', background: 'rgba(255, 255, 255, 0.25)', border: '2px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', padding: '20px 24px', maxWidth: '400px', width: '100%' }}
            >
              <div style={{ background: 'linear-gradient(135deg, #9b59b6, #8e44ad)', padding: '15px', borderRadius: '16px', display: 'flex', boxShadow: '0 5px 15px rgba(155, 89, 182, 0.4)' }}>
                <Briefcase size={30} color="#fff" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Prepare for Interview</span>
                <span style={{ fontSize: '15px', fontWeight: '500', color: 'rgba(255,255,255,0.9)', marginTop: '4px' }}>AI-driven mock interviews</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="auth-card-image-container" style={{ order: 2 }}>
          <img src={heroImg} alt="Student" className="auth-card-image" />
        </div>
      </div>

      {showModal && dailyQuiz && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--panel-bg)', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '500px', position: 'relative', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 15px 50px rgba(0,0,0,0.5)' }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 210, 255, 0.1)', padding: '8px 16px', borderRadius: '20px', color: '#00d2ff', marginBottom: '15px' }}>
                <Gem size={20} />
                <span style={{ fontWeight: 'bold' }}>Daily English Challenge</span>
              </div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', color: '#fff' }}>{dailyQuiz.question}</h3>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Level: {dailyQuiz.level}</span>
            </div>

            {!result ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {dailyQuiz.options.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedOption(opt)}
                    style={{ 
                      padding: '15px', 
                      borderRadius: '12px', 
                      background: selectedOption === opt ? 'rgba(52, 152, 219, 0.3)' : 'rgba(255,255,255,0.05)', 
                      border: selectedOption === opt ? '1px solid #3498db' : '1px solid rgba(255,255,255,0.1)',
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
                
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={!selectedOption}
                  style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '28px', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    cursor: selectedOption ? 'pointer' : 'not-allowed',
                    opacity: selectedOption ? 1 : 0.5 
                  }}
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div style={{ animation: 'fadeIn 0.5s ease', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
                  {result.isCorrect ? '🎉' : '❌'}
                </div>
                <h3 style={{ color: result.isCorrect ? '#2ecc71' : '#e74c3c', fontSize: '1.5rem', margin: '0 0 15px 0' }}>
                  {result.isCorrect ? 'Correct!' : 'Incorrect!'}
                </h3>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', marginBottom: '20px', textAlign: 'left' }}>
                  <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Correct Answer:</span> <br/>
                    <strong style={{ color: '#fff' }}>{result.correctAnswer}</strong>
                  </p>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {result.explanation}
                  </p>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: '#00d2ff' }}>
                  <Gem size={24} /> Current Streak: {result.streak} Days
                </div>

                <button 
                  onClick={() => setShowModal(false)}
                  style={{ width: '100%', marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '28px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Close & Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
