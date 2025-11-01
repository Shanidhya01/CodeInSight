import axios from "axios";

// Create API instance
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

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
