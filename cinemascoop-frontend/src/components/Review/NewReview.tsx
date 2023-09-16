import { useState } from "react";
import Review from "@/models/review";
import { useSelector } from 'react-redux';
import { AuthState } from '../../store/types';


const NewReview = ({ movieId,onReviewSubmitted  }: { movieId: string,onReviewSubmitted: () => void}) => {
    const [reviewContent, setReviewContent] = useState("");
    const [ratting, setRating] = useState<number | null>(null);
    const token = useSelector((state: { auth: AuthState }) => state.auth.token);

    const handleSubmit = async () => {
        try {
            if (ratting === null) {
                alert('Please select a rating.');
                return;
            }

            const reviewData: Review = {
                reviewContent,
                ratting,
                movieId,
                user:"",
            };

            const response = await fetch('/api/reviews/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...reviewData,token})
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                onReviewSubmitted();
                setReviewContent("");
                setRating(null);
            } else {
                throw new Error("Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    }

    return (
        <div className="mt-8 px-4 py-6 bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-4">Write a review:</h2>
            <textarea
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                rows={4}
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Share your thoughts about this movie..."
            ></textarea>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">Rating (1-10):</label>
                <input
                    className="mt-1 p-2 w-20 border rounded-md focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    type="number"
                    min="1"
                    max="10"
                    value={ratting || ""}
                    onChange={(e) => setRating(Number(e.target.value))}
                />
            </div>
            <button
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-60"
                onClick={handleSubmit}
            >
                Submit Review
            </button>
        </div>
    );
}

export default NewReview;
