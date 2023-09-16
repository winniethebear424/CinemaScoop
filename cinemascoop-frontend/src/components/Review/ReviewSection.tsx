import Review from "@/models/review"
import MovieReview from "./MovieReviews";
import NewReview from "./NewReview";
import { useState, useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"


const ReviewSection = ({ movieId }: { movieId: string }) => {
    const { user } = useUser();
    const [reviews, setReview] = useState<Review[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReview = async () => {
        try {
            const response = await fetch(`/api/reviews/get?movieId=${movieId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch review");
            }

            const data = await response.json();
            setReview(data.data.reviews);
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReview();
    }, [movieId]);

    return (
        <div className="flex flex-col mb-6 mt-6">
            <div className="flex justify-between items-center mt-4">
                <h1 className="text-2xl font-medium">Reviews</h1>
            </div>
            <div>
                <MovieReview reviews={reviews} loading={loading} error={error} onReviewDelete={fetchReview} onReviewUpdate={fetchReview}/>
                {!!user ? (<NewReview movieId={movieId} onReviewSubmitted={fetchReview} />):(<div>Please login to comments the movies</div>)}
            </div>
        </div>
    )
}


export default ReviewSection;