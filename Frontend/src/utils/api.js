import axios from "axios";

// Resolve API base URL robustly for local and deployed envs
function resolveBaseUrl() {
  const envUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  if (envUrl) return envUrl;
  // Optional runtime override (can be injected via <script> on host)
  if (typeof window !== "undefined" && window.__API_URL__) {
    return String(window.__API_URL__).replace(/\/$/, "");
  }
  // Fallbacks: in production, try same origin; in dev, localhost:5000
  if (import.meta.env.PROD && typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:5000";
}

const API_BASE = resolveBaseUrl();
const API = axios.create({ baseURL: `${API_BASE}/api` });

// ✅ Attach Firebase user token (for protected routes)
API.interceptors.request.use(async (config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

// ✨ Submit code for AI review (sends userId & userEmail if available)
export const submitCodeForReview = async (filename, code, userId, userEmail) => {
  // Fallback to localStorage persisted user if args not provided
  if (!userId || !userEmail) {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      userId = userId || stored?.uid;
      userEmail = userEmail || stored?.email;
    } catch (_) {}
  }
  const response = await API.post("/review", { filename, code, userId, userEmail });
  return response.data;
};

// ✨ Get reviews for the logged-in user only
export const getUserReviews = async (userId) => {
  const response = await API.get(`/review`, { params: { userId } });
  return response.data;
};

// Backwards-compat alias used by some pages (e.g., History)
export const getReviews = async (userId) => getUserReviews(userId);

// ✨ Delete a review by ID
export const deleteReview = async (id) => {
  const response = await API.delete(`/review/${id}`);
  return response.data;
};
