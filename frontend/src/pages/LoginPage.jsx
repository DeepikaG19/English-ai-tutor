import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../auth.css';
import heroImg from '../assets/hero.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password) {
      setError('Please enter both username/email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        identifier,
        password
      });

      if (response.data.success) {
        localStorage.setItem('currentUser', response.data.user.username);
        navigate('/daily-challenge');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-card-image-container" style={{ order: 1 }}>
          <img src={heroImg} alt="Student" className="auth-card-image" />
        </div>
        
        <div className="auth-card-content" style={{ order: 2, paddingLeft: '20px', position: 'relative' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ position: 'absolute', top: '-10px', left: '20px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <ArrowLeft size={20} /> <span style={{fontSize: '14px', fontWeight: '500'}}>Back</span>
          </button>
          <h2 className="auth-title" style={{marginTop: '25px'}}>
             Let the Journey Begin!
          </h2>
          
          <form onSubmit={handleLogin}>
            {error && <div style={{ color: '#ff4757', marginBottom: '15px', fontSize: '14px', textAlign: 'center', background: 'rgba(255, 71, 87, 0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}
            
            <div className="form-group">
              <label>Username or Email</label>
              <input 
                type="text" 
                className="form-control" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? 
                  <Eye className="eye-icon" onClick={() => setShowPassword(false)} /> : 
                  <EyeOff className="eye-icon" onClick={() => setShowPassword(true)} />
                }
              </div>
              <div style={{textAlign: 'right', fontSize: '10px', color: '#666', marginTop: '4px'}}>
                Forgot Password?
              </div>
            </div>
            
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </form>
          
          <div className="auth-footer">
            <span>Don't have an account?</span>
            <button className="btn-secondary" onClick={() => navigate('/signup')}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
