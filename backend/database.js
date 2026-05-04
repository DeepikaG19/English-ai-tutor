const Database = require('better-sqlite3');
const path = require('path');

// Connect to SQLite database (will create database.sqlite if it doesn't exist)
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Initialize database tables
const initDB = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL
    )
  `);

  try {
    db.exec('ALTER TABLE users ADD COLUMN currentStreak INTEGER DEFAULT 0');
    db.exec('ALTER TABLE users ADD COLUMN lastAttemptDate TEXT');
    db.exec('ALTER TABLE users ADD COLUMN totalCorrectAnswers INTEGER DEFAULT 0');
  } catch (e) {
    // Columns might already exist, ignore error
  }

  console.log('Database initialized successfully.');
};

initDB();

module.exports = db;
