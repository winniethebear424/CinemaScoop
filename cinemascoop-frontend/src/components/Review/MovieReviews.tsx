import Review from "@/models/review"

import ReviewCard from "./ReviewCard"

interface MovieReviewProps {
    reviews: Review[] | null;
    loading: boolean;
    error: string | null;
    onReviewDelete:()=>void
    onReviewUpdate:()=>void
}

const MovieReview: React.FC<MovieReviewProps> = ({ reviews, loading, error,onReviewDelete,onReviewUpdate}) => {


    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="space-y-4">
                {reviews?.map(review => (
                    <ReviewCard key={review._id} review={review} onReviewDelete={onReviewDelete} onReviewUpdate={onReviewUpdate}  />
                ))}
            </div>
        </div>
    )
}

export default MovieReview