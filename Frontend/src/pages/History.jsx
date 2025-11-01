import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getReviews } from "../utils/api";
import ReviewCard from "../components/ReviewCard";

export default function History() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user) {
      getReviews(user.uid).then((data) => setReviews(data));
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10 text-gray-400">Please login to view history.</p>;

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-gray-100">
      <h2 className="text-xl font-semibold text-indigo-400 mb-4">Your Review History</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onDelete={(id) => setReviews(reviews.filter((r) => r._id !== id))}
          />
        ))
      )}
    </div>
  );
}
