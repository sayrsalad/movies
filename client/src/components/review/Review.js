import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import filter from '../../assets/Filter';

const Review = ({ reviews }) => {

    const [reviewArray, setReviewArray] = useState();
    
    const showRating = (rating) => {
        var rows = [];
        for (var i = 0; i < rating; i++) {
            rows.push(<FontAwesomeIcon className="text-warning" icon="star" key={i} />);
        }

        for (var a = 5; a > rating; a--) {
            rows.push(<FontAwesomeIcon className="text-warning" icon={["far", "star"]} key={a} />);
        }
        return rows;
    }

    return (
        <div className="reviews">
            {/* <hr className="text-secondary"></hr> */}
            {reviews && reviews.map(review => (
                <div className="bg-dark p-3 my-3 rounded-1" key={review.user}>
                    <div className="stars">
                        {showRating(review.rating)}
                    </div>

                    <p className="text-secondary fs-6">by {review.username}</p>
                    <p className="review_comment m-0">{review.comment && filter.clean(review.comment)}</p>

                    {/* <hr className="text-secondary"></hr> */}
                </div>
            ))}
        </div>
    )
}

export default Review
