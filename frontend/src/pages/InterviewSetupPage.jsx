import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, UploadCloud, FileText, Loader2 } from 'lucide-react';
import { io } from 'socket.io-client';
import '../auth.css';

const SOCKET_URL = 'http://localhost:3000';

export default function InterviewSetupPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [questionCount, setQuestionCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid PDF file.');
    }
  };

  const handleStart = async () => {
    if (!file) {
      setError('Please upload your resume to continue.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Temporarily connect to get a socket ID for session management
      const socket = io(SOCKET_URL);
      
      socket.on('connect', async () => {
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('questionCount', questionCount);
        formData.append('socketId', socket.id);

        try {
          const response = await axios.post('http://localhost:3000/api/interview/setup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });

          if (response.data.success) {
            // Pass the socket connection ID to the interview page so it shares the same session
            navigate('/interview/chat', { state: { socketId: socket.id, totalQuestions: questionCount } });
          } else {
            setError('Failed to setup interview. Please try again.');
            socket.disconnect();
            setIsLoading(false);
          }
        } catch (err) {
          setError('Server error during setup.');
          socket.disconnect();
          setIsLoading(false);
        }
      });
    } catch (err) {
      setError('Could not connect to server.');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper theme-advanced">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-card-content" style={{ order: 1, paddingRight: '20px', position: 'relative', width: '100%' }}>
          <button 
            onClick={() => navigate('/mode')} 
            style={{ position: 'absolute', top: '-10px', left: '0px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <ArrowLeft size={20} /> <span style={{fontSize: '14px', fontWeight: '500'}}>Back</span>
          </button>
          
          <h2 className="auth-title" style={{marginTop: '25px', marginBottom: '10px'}}>Interview Setup</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '30px' }}>Upload your resume and customize your mock interview.</p>
          
          {error && <div style={{ color: '#ff4757', marginBottom: '20px', padding: '10px', background: 'rgba(255,71,87,0.1)', borderRadius: '8px' }}>{error}</div>}

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.9)', marginBottom: '10px', fontWeight: 'bold' }}>1. Upload Resume (PDF)</label>
            <div style={{ 
              border: '2px dashed rgba(255,255,255,0.3)', 
              borderRadius: '12px', 
              padding: '30px', 
              textAlign: 'center',
              background: 'rgba(0,0,0,0.2)',
              position: 'relative'
            }}>
              <input 
                type="file" 
                accept=".pdf"
                onChange={handleFileChange}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              />
              {file ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <FileText size={40} color="#2ed573" />
                  <span style={{ color: '#2ed573', fontWeight: 'bold' }}>{file.name}</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Click to change file</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <UploadCloud size={40} color="rgba(255,255,255,0.5)" />
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>Drag & drop or click to upload PDF</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.9)', marginBottom: '10px', fontWeight: 'bold' }}>2. Number of Questions</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[5, 10, 20, 30].map(num => (
                <button
                  key={num}
                  onClick={() => setQuestionCount(num)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: questionCount === num ? '#fbc531' : 'rgba(255,255,255,0.2)',
                    background: questionCount === num ? 'rgba(251, 197, 49, 0.2)' : 'rgba(255,255,255,0.05)',
                    color: questionCount === num ? '#fbc531' : '#fff',
                    fontWeight: questionCount === num ? 'bold' : 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleStart}
            disabled={isLoading}
            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
          >
            {isLoading ? <><Loader2 className="spinning" size={20} /> Parsing Resume & Setting up AI...</> : 'Start Interview'}
          </button>
        </div>
      </div>
    </div>
  );
}
