/**
 * Centralized API configuration for the frontend.
 * Import this in any module that needs to call the backend.
 */

export const API_BASE =
  process.env.REACT_APP_API_BASE ?? "http://localhost:3001";
