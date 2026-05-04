# English AI Tutor

Welcome to the **English AI Tutor**! This is an intelligent, interactive web application designed to help users improve their English speaking and grammar skills through personalized practice, dynamic quizzes, and AI-driven feedback.

## Features

- **Speaking Practice Module**: Tailored proficiency levels (Beginner, Intermediate, Advanced) to provide structured spoken English practice.
- **Daily English Challenge**: A streak-based daily quiz system to keep users engaged and continuously learning.
- **Real-time AI Feedback**: Detailed grammatical explanations and corrections in both English and Tamil to help users learn from their mistakes.
- **Mock Interviews**: Setup and practice professional interviews with AI, complete with performance results.
- **Speak Free Mode**: Unstructured conversational practice with an AI companion.
- **Level Selection**: Dynamic adjustments based on the user's proficiency.

## Tech Stack

### Frontend
- **React (Vite)**: Fast and modern frontend framework.
- **React Router**: For seamless client-side navigation.
- **CSS**: Custom, responsive styling for a beautiful user experience.
- **Socket.io-client**: For real-time, interactive AI communication.

### Backend
- **Node.js & Express**: Robust and scalable server environment.
- **SQLite (better-sqlite3)**: Lightweight, file-based database for storing user profiles and quiz streaks.
- **OpenAI (via Groq)**: Powerful AI models for generating dynamic tasks and contextual feedback.
- **Socket.io**: Enabling live bidirectional communication for voice and text chat features.
- **Multer**: Handling audio/file uploads.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DeepikaG19/English-ai-tutor.git
   cd English-ai-tutor
   ```

2. Set up the Backend:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your Groq API key:
   ```env
   GROQ_API_KEY=your_api_key_here
   PORT=3000
   ```
   Start the backend server:
   ```bash
   npm start
   # or node server.js
   ```

3. Set up the Frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/` (or the port Vite provides).

## Project Structure

- `/backend`: Contains all server-side logic, database interactions, and API routes.
- `/frontend`: Contains the React application, UI components, and client-side routing.

## License
This project is for educational and portfolio purposes.
