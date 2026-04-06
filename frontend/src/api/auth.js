/**
 * API client for auth endpoints.
 * Calls the backend at /auth/*.
 */

import { API_BASE } from "./config.js";

/**
 * Logs in with email and password.
 * TODO: Implement when backend exposes POST /auth/login (mirror signup: JSON body, handle response.ok and errors).
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ user?: object, session?: object, error?: string }>}
 */
export async function login(credentials) {
  // TODO: POST `${API_BASE}/auth/login` with JSON { email, password }; parse JSON; if (!response.ok) return { error }; return { user, session }.
  console.warn("login() not implemented yet", credentials);
  return {};
}

/**
 * Registers a new user via the backend Supabase signup route.
 * @param {{ email: string, password: string, data?: object }} userData - optional `data` is app user metadata (Supabase raw_user_meta_data)
 * @returns {Promise<{ user?: object, session?: object, error?: string }>}
 */
export async function signup(userData) {
  const { email, password, data: userMetadata } = userData ?? {};
  try {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        ...(userMetadata != null && typeof userMetadata === "object"
          ? { data: userMetadata }
          : {}),
      }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("/auth/signup:", body.error ?? response.status);
      return { error: body.error ?? "Signup failed" };
    }
    return { user: body.user, session: body.session };
  } catch (error) {
    console.error("Error posting /auth/signup:", error);
    return { error: "Signup failed", type: error };
  }
}
