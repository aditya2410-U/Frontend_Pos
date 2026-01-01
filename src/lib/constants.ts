export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8008/api/v1";

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DETAILS: "user_details",
};

// Query stale time constants
export const STALE_TIME = {
  STANDARD: 1 * 60 * 60 * 1000, // 1 hour
  SHORT: 5 * 60 * 1000, // 5 minutes
};
