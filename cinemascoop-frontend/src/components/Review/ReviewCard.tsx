import React from 'react';
import Review from '@/models/review';
import { useUser } from "@auth0/nextjs-auth0/client"
import { useSelector } from 'react-redux';
import { AuthState } from '../../store/types';
import { useState } from "react";

const ReviewCard = ({ review, onReviewDelete, onReviewUpdate }: { review: Review, onReviewDelete: () => void, onReviewUpdate: () => void }) => {
    const { user } = useUser();
    const token = useSelector((state: { auth: AuthState }) => state.auth.token);
    const [reviewContent, setReviewContent] = useState(review.reviewContent);
    const [ratting, setRating] = useState<number | null>(review.ratting);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    }
    const handleCancel = () => {
        setIsEditing(false);
    }
    const handleSave = async () => {
        if (isEditing) {
            const response = await fetch('/api/reviews/patch', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reviewId: review._id,
                    reviewContent,
                    ratting:review.ratting,
                    movie:review.movieId,
                    token
                }),
            });
            onReviewUpdate();
        }
        setIsEditing(!isEditing);
    }
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            const response = await fetch('/api/reviews/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reviewId: review._id,
                    token
                }),
            });
            onReviewDelete();
        }
    }
    return (
        <div className="border border-gray-300 p-4 rounded-md mb-4">
            <p className="font-bold flex items-center">
                {review.user}
                <span className="bg-yellow-300 ml-2 py-1 px-2 rounded text-sm">{review.ratting} / 10</span>
            </p>
            <p className="mt-2">
                {isEditing
                    ? <textarea className='mt-2 w-full p-2 border border-gray-300 rounded-md resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-60' value={reviewContent} onChange={e => setReviewContent(e.target.value)} />
                    : review.reviewContent
                }
            </p>

            {!!user && user.sub === review.user ? (<div className='flex justify-end gap-10'>
                <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-60" onClick={handleEdit}>Edit</button>

                {isEditing ? (<><button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-60" onClick={handleSave}>Save</button>
                    <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-60" onClick={handleCancel}>Cancel</button>
                </>) : (<button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-60" onClick={handleDelete}>Delete</button>)}
            </div>) : (<></>)}

        </div>
    );
};

export default ReviewCard;
