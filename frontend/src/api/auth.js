/**
 * API client for auth endpoints.
 * TODO: Implement login and signup to call the backend when auth API exists.
 */

import { API_BASE } from "./config.js";

/**
 * Logs in with email/username and password.
 * @param {{ email?: string, username?: string, password: string }} credentials
 * @returns {Promise<{ user?: object, token?: string }>}
 */
export async function login(credentials) {
  // TODO: POST ${API_BASE}/login (or /auth/login) with credentials, return user/token
  console.warn("login() not implemented yet", credentials);
  return {};
}

/**
 * Registers a new user.
 * @param {{ name?: string, email: string, password: string }} userData
 * @returns {Promise<{ user?: object }>}
 */
export async function signup(userData) {
  // TODO: POST ${API_BASE}/signup (or /auth/signup) with userData, return user
  console.warn("signup() not implemented yet", userData);
  return {};
}
