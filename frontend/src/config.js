// Centralized API configuration
// Reads Vite environment variable VITE_API_BASE_URL in production,
// and falls back to http://localhost:3000 for local development.

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
).replace(/\/+$/, ''); // Remove trailing slashes if any
