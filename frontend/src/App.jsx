import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ModeSelectionPage from './pages/ModeSelectionPage';
import LevelSelectionPage from './pages/LevelSelectionPage';
import ChatPage from './pages/ChatPage';
import InterviewSetupPage from './pages/InterviewSetupPage';
import InterviewPage from './pages/InterviewPage';
import InterviewResultsPage from './pages/InterviewResultsPage';
import DailyChallengePage from './pages/DailyChallengePage';
import SpeakFreePage from './pages/SpeakFreePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mode" element={<ModeSelectionPage />} />
        <Route path="/daily-challenge" element={<DailyChallengePage />} />
        <Route path="/levels" element={<LevelSelectionPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/speak-free" element={<SpeakFreePage />} />
        <Route path="/interview" element={<InterviewSetupPage />} />
        <Route path="/interview/chat" element={<InterviewPage />} />
        <Route path="/interview/results" element={<InterviewResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
