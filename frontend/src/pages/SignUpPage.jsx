import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../auth.css';
import heroImg from '../assets/hero.png';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password || !confirmPassword || !fullName.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        fullName,
        email,
        username,
        password
      });

      if (response.data.success) {
        localStorage.setItem('currentUser', username);
        navigate('/daily-challenge');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during sign up.');
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
            Sign Up
          </h2>
          
          <form onSubmit={handleSignUp}>
            {error && <div style={{ color: '#ff4757', marginBottom: '15px', fontSize: '14px', textAlign: 'center', background: 'rgba(255, 71, 87, 0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                className="form-control" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            </div>
            
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-container">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="form-control" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showConfirmPassword ? 
                  <Eye className="eye-icon" onClick={() => setShowConfirmPassword(false)} /> : 
                  <EyeOff className="eye-icon" onClick={() => setShowConfirmPassword(true)} />
                }
              </div>
            </div>
            
            <div className="checkbox-container">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" style={{ margin: 0 }}>I agree to the Terms of User</label>
            </div>
            
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
