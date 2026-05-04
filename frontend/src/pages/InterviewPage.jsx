import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mic, Square, Loader2, VolumeX, ArrowLeft } from 'lucide-react';
import '../index.css';

export default function InterviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const socketId = location.state?.socketId;
  const totalQuestions = location.state?.totalQuestions || 5;

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [initialText, setInitialText] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const chatEndRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.className = 'theme-interview';

    if (!socketId) {
      navigate('/mode');
      return;
    }

    const username = localStorage.getItem('currentUser') || 'Candidate';
    const text = `Hello! I am your HR Manager today. I have your resume right here. Can we proceed, ${username}?`;
    setInitialText(text);

    // Initial message
    setMessages([{
      id: 'greeting',
      role: 'ai',
      text: text,
    }]);

    return () => {
      document.body.className = '';
      stopAudio();
    };
  }, [socketId, navigate]);

  const handleStartInterview = () => {
    setHasStarted(true);
    playAudio(initialText);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    window.speechSynthesis.cancel();
  };

  const playAudio = (textToSpeak) => {
    stopAudio();
    if (textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US'; 
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    } else {
      try {
        stopAudio();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');
          formData.append('socketId', socketId);

          try {
            const response = await axios.post('http://localhost:3000/api/interview/chat', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });

            const data = response.data;
            if (data.success) {
              setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: data.userText }]);
              
              if (data.isComplete) {
                navigate('/interview/results', { state: { results: data } });
              } else {
                setMessages(prev => [...prev, { 
                  id: (Date.now()+1).toString(), 
                  role: 'ai', 
                  text: data.reply,
                  correction: data.correction
                }]);
                setCurrentQuestion(prev => prev + 1);
                playAudio(data.spokenText);
              }
            } else {
              alert("Error: " + data.message);
            }
          } catch (err) {
            console.error("Upload error", err);
            alert("Error sending audio to server.");
          } finally {
            setIsProcessing(false);
          }
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing mic:", err);
        alert("Please enable microphone permissions.");
      }
    }
  };

  return (
    <div className="app-container">
      <header style={{ position: 'relative' }}>
        <button 
          onClick={() => navigate('/mode')} 
          style={{ position: 'absolute', top: '10px', left: '0', background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1>Mock Interview</h1>
        <p>Question {currentQuestion} of {totalQuestions}</p>
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '2px', marginTop: '10px' }}>
          <div style={{ width: `${(currentQuestion / totalQuestions) * 100}%`, background: '#fbc531', height: '100%', borderRadius: '2px', transition: 'width 0.3s' }}></div>
        </div>
      </header>

      <div className="chat-container">
        {!hasStarted ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '20px' }}>
             <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>The HR Manager is ready.</div>
             <button className="btn-primary" onClick={handleStartInterview} style={{ padding: '15px 30px', fontSize: '18px' }}>
                Begin Interview
             </button>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.role === 'ai' ? 'ai-bubble' : 'user-bubble'}`}>
                <div className="message-text">{msg.text}</div>
                {msg.correction && (
                  <div className="feedback-box">
                    <strong>Feedback:</strong> {msg.correction}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      <div className="status-indicator">
        {!hasStarted ? "" :
         isRecording ? "Listening... Tap to stop" : 
         isProcessing ? "HR is thinking..." : "Tap the mic to answer"}
      </div>

      <div className="controls-container" style={{ gap: '1.5rem', opacity: hasStarted ? 1 : 0.5, pointerEvents: hasStarted ? 'auto' : 'none' }}>
        <button 
          className={`mic-button ${isRecording ? 'recording' : ''}`}
          onClick={toggleRecording}
          disabled={isProcessing}
        >
          {isRecording ? <Square fill="currentColor" /> : <Mic />}
        </button>

        <button 
          className="mic-button"
          onClick={stopAudio}
          title="Stop Audio"
          style={{ width: '50px', height: '50px', background: 'var(--panel-bg)', color: 'var(--text-main)', border: 'var(--glass-border)' }}
        >
          <VolumeX size={24} />
        </button>
      </div>
    </div>
  );
}
