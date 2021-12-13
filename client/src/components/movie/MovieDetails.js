import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from 'react-alert';

import { getMovieDetails, clearErrors, newMovieReview } from '../../actions/movieActions';
import { NEW_MOVIE_REVIEW_RESET } from '../../constants/movieConstants';

import Review from '../review/Review';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import './movie.css';

const MovieDetails = ({ history, match }) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, movie, error } = useSelector(state => state.movieDetails);
    const { user } = useSelector(state => state.auth);
    const { error: reviewError, success } = useSelector(state => state.newMovieReview);

    useEffect(() => {

        dispatch(getMovieDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors);
        }

        if (success) {
            alert.success('Movie review was successfully posted.');
            dispatch({ type: NEW_MOVIE_REVIEW_RESET });
        }


    }, [dispatch, alert, error, reviewError, match.params.id, success]);


    const convertDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dateObject = new Date(date);
        const day = dateObject.getDay();
        const month = dateObject.getMonth();
        const year = dateObject.getFullYear();
        return `${monthNames[month]} ${day}, ${year}`;
    }

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

        dispatch(newMovieReview(reviewData));

    }

    return (
        <Fragment>
            {loading ? <Loader className="mx-1" /> : (
                <Fragment>
                    <MetaData title={movie.title ? movie.title : ""} />
                    <div className="mt-5">
                        <div className="container mx-auto row text-white justify-content-center">
                            <div className="col-sm-auto">
                                <img src={movie.poster && movie.poster.url} alt={movie.poster && movie.poster.public_id} className="movie-details-poster rounded-3" />
                            </div>
                            <div className="col ps-5 d-flex flex-column">
                                <h2 className="fs-1 mt-4 fw-bolder">{movie.title}</h2>
                                {/* <button
                                    className="button icon-left"
                                    onClick={history.goBack}>
                                    Back
                                </button> */}
                                <div className="flex flex-wrap items-center text-white-50 text-sm">
                                    {/* <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg> */}
                                    <FontAwesomeIcon className="text-warning" icon="star" />
                                    <span className="ms-1">{parseFloat(movie.ratings).toFixed(2)}</span>
                                    <span className="mx-2">|</span>
                                    <span>{convertDate(movie.releaseDate)}</span>
                                    <span className="mx-2">|</span>
                                    <span>{movie.genre}</span>
                                    <span className="mx-2">|</span>
                                    <span>{movie.duration}m</span>
                                </div>

                                <p className="mt-5 text-white-25">
                                    {movie.story}
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
                                                    {movie.title}
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
                            <h2 className="fs-1 mt-2 fw-bolder">Cast</h2>
                        </div>
                    </div>
                    {/* <div className="mt-12">
                    <h4 className="text-white fw-bolder">Featured Crew</h4>
                    <div className="flex mt-4">
                        @foreach ($movie['crew'] as $crew)
                            <div className="mr-8">
                                <div>{{ $crew['name'] }}</div>
                                <div className="text-sm text-gray-400">{{ $crew['job'] }}</div>
                            </div>

                        @endforeach
                    </div>
                </div> */}

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
                            {movie.reviews && movie.reviews.length > 0 && (
                                <Review reviews={movie.reviews} />
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default MovieDetails

