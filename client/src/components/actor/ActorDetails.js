import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from 'react-alert';

import { getActorDetails, clearErrors, newActorReview } from '../../actions/actorActions';
import { NEW_ACTOR_REVIEW_RESET } from '../../constants/actorConstants';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Review from '../review/Review';

import './actor.css';

const ActorDetails = ({ history, match }) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, actor, error } = useSelector(state => state.actorDetails);
    const { user } = useSelector(state => state.auth);
    const { error: reviewError, success } = useSelector(state => state.newActorReview);

    useEffect(() => {

        dispatch(getActorDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors);
        }
        console.log(success);
        if (success) {
            alert.success('Actor review was successfully posted.');
            dispatch({ type: NEW_ACTOR_REVIEW_RESET });
        }

    }, [dispatch, alert, error, reviewError, match.params.id, success]);

    // const convertDate = (date) => {
    //     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     const dateObject = new Date(date);
    //     const day = dateObject.getDay();
    //     const month = dateObject.getMonth();
    //     const year = dateObject.getFullYear();
    //     return `${monthNames[month]} ${day}, ${year}`;
    // }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('text-rate');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('text-rate')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('text-warning');
                    } else {
                        star.classList.remove('text-warning')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('text-warning')
                }
            })
        }
    }

    const submitReviewHandler = () => {
        const reviewData = new FormData();

        reviewData.set('rating', rating);
        reviewData.set('comment', comment);
        reviewData.set('_id', match.params.id);

        dispatch(newActorReview(reviewData));

    }

    return (
        <Fragment>
            <MetaData title={`${actor.firstname} ${actor.lastname}`} />
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="mt-5">
                        <div className="container mx-auto row text-white justify-content-center">
                            <div className="col-sm-auto">
                                <img src={actor.profile && actor.profile.url} alt={actor.profile && actor.profile.public_id} className="rounded-3 actor-details-poster" />
                            </div>
                            <div className="col ps-5 d-flex flex-column">
                                <h2 className="fs-1 mt-4 md:mt-0 fw-bolder">{actor.firstname} {actor.lastname}</h2>

                                <p className="mt-5 text-white-25">
                                    {actor.biography}
                                </p>

                                
                                <div className="h-100 d-flex align-items-end flex-column">

                                    {user ?
                                        <button type="button" className="btn btn-danger mt-auto" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={setUserRatings}>
                                            Review
                                        </button> :
                                        <a className="btn btn-danger mt-auto" id="loginBtn" href="/login">Review</a>
                                    }

                                </div>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                                        <div className="modal-content bg-dark-2">
                                            <div className="modal-header border-0">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    {actor.title}
                                                </h5>
                                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <ul className="list-unstyled d-flex justify-content-center" >
                                                    <li className="star" role="button"><FontAwesomeIcon icon="star" size="2x" className="mx-1" /></li>
                                                    <li className="star" role="button"><FontAwesomeIcon icon="star" size="2x" className="mx-1" /></li>
                                                    <li className="star" role="button"><FontAwesomeIcon icon="star" size="2x" className="mx-1" /></li>
                                                    <li className="star" role="button"><FontAwesomeIcon icon="star" size="2x" className="mx-1" /></li>
                                                    <li className="star" role="button"><FontAwesomeIcon icon="star" size="2x" className="mx-1" /></li>
                                                </ul>
                                                <div className="form-floating">
                                                    <textarea className="form-control bg-transparent text-white remove-form-design" placeholder="Leave a comment here" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                                    <label htmlFor="floatingTextarea">Comments</label>
                                                </div>
                                            </div>
                                            <div className="modal-footer border-0">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitReviewHandler}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <hr className="text-secondary"></hr>

                    <div className="mt-3">
                        <div className="container mx-auto row text-white">
                            <h2 className="fs-1 mt-2 fw-bolder">Movies</h2>
                        </div>
                    </div>

                    <hr className="text-secondary"></hr>

                    <div className="mt-3">
                        <div className="container mx-auto row text-white">
                            <h2 className="fs-1 mt-2 fw-bolder">Images</h2>
                        </div>
                    </div>

                    <hr className="text-secondary"></hr>

                    <div className="mt-3">
                        <div className="container mx-auto row text-white">
                            <h2 className="fs-1 mt-2 fw-bolder">Reviews</h2>
                            {actor.reviews && actor.reviews.length > 0 && (
                                <Review reviews={actor.reviews} />
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ActorDetails

