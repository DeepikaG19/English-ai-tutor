import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, Award } from 'lucide-react';
import '../auth.css';

export default function InterviewResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  if (!results) {
    return (
      <div className="auth-page-wrapper theme-advanced">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <h2>No Results Found</h2>
          <button className="btn-primary" onClick={() => navigate('/mode')}>Go Back</button>
        </div>
      </div>
    );
  }

  const score = results.finalScore || 0;
  let scoreColor = '#ef4444'; // Red
  if (score >= 70) scoreColor = '#fbc531'; // Yellow
  if (score >= 85) scoreColor = '#2ed573'; // Green

  return (
    <div className="auth-page-wrapper theme-advanced">
      <div className="auth-card" style={{ maxWidth: '800px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="auth-card-content" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 className="auth-title" style={{ margin: 0 }}>Interview Results</h2>
            <button 
              onClick={() => navigate('/mode')} 
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 16px' }}
            >
              <ArrowLeft size={16} /> Exit
            </button>
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {/* Score Card */}
            <div style={{ flex: '1', minWidth: '250px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '30px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Award size={48} color={scoreColor} style={{ marginBottom: '15px' }} />
              <h3 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', margin: '0 0 10px 0' }}>Overall Score</h3>
              <div style={{ fontSize: '64px', fontWeight: 'bold', color: scoreColor, lineHeight: '1' }}>
                {score}
                <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.5)' }}>/100</span>
              </div>
            </div>

            {/* Feedback Summary */}
            <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ background: 'rgba(46, 213, 115, 0.1)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(46, 213, 115, 0.2)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2ed573', margin: '0 0 15px 0' }}>
                  <CheckCircle size={20} /> Key Strengths
                </h4>
                <ul style={{ color: 'rgba(255,255,255,0.9)', margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
                  {results.strengths && results.strengths.length > 0 ? (
                    results.strengths.map((str, i) => <li key={i}>{str}</li>)
                  ) : (
                    <li>Good effort throughout the interview.</li>
                  )}
                </ul>
              </div>

              <div style={{ background: 'rgba(251, 197, 49, 0.1)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(251, 197, 49, 0.2)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbc531', margin: '0 0 15px 0' }}>
                  <AlertTriangle size={20} /> Areas for Improvement
                </h4>
                <ul style={{ color: 'rgba(255,255,255,0.9)', margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
                  {results.improvements && results.improvements.length > 0 ? (
                    results.improvements.map((imp, i) => <li key={i}>{imp}</li>)
                  ) : (
                    <li>Focus on giving more detailed examples in your answers.</li>
                  )}
                </ul>
              </div>

            </div>
          </div>
          
          <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
             <h4 style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 10px 0' }}>HR Manager's Final Note:</h4>
             <p style={{ color: '#fff', fontSize: '16px', fontStyle: 'italic', margin: 0 }}>"{results.reply}"</p>
          </div>

          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <button className="btn-primary" onClick={() => navigate('/mode')} style={{ flex: 1 }}>Return to Dashboard</button>
            <button className="btn-secondary" onClick={() => navigate('/interview')} style={{ flex: 1 }}>Try Again</button>
          </div>

        </div>
      </div>
    </div>
  );
}
