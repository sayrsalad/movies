import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from 'react-alert';

import { getProducerDetails, clearErrors } from '../../actions/producerActions';

import MovieCards from "../movie/MovieCards";
import ImageCards from '../image/ImageCards';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import './producer.css';

const ProducerDetails = ({ history, match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, producer, error } = useSelector(state => state.producerDetails);

    useEffect(() => {

        dispatch(getProducerDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

    }, [dispatch, alert, error, match.params.id]);
    console.log(producer);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${producer.name}`} />
                    <div className="mt-5">
                        <div className="container mx-auto row text-white justify-content-center">
                            <div className="col-sm-auto">
                                <img src={producer.profile && producer.profile.url} alt={producer.profile && producer.profile.public_id} className="rounded-3 producer-details-poster" />
                            </div>
                            <div className="col ps-5 d-flex flex-column">
                                <h2 className="fs-1 mt-4 md:mt-0 fw-bolder">{producer.name}</h2>

                                <p className="mt-5 text-white-25">
                                    Email: {producer.email}
                                </p>

                                <p className="mt-5 text-white-25">
                                    Website: {producer.website}
                                </p>

                                <div className="h-100 d-flex align-items-end flex-column">

                                    {/* {user ?
                                        <button type="button" className="btn btn-danger mt-auto" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={setUserRatings}>
                                            Review
                                        </button> :
                                        <a className="btn btn-danger mt-auto" id="loginBtn" href="/login">Review</a>
                                    } */}

                                </div>

                                {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                                        <div className="modal-content bg-dark-2">
                                            <div className="modal-header border-0">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    {producer.title}
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
                                </div> */}
                            </div>
                        </div>
                    </div>


                    <hr className="text-secondary"></hr>

                    <div className="mt-3">
                        <div className="container mx-auto row text-white">
                            <h2 className="fs-1 mt-2 fw-bolder">Movies</h2>
                            <div className="row justify-content-center">
                                {producer.movies && producer.movies.map(movie => (
                                    <MovieCards key={movie._id} movie={movie}/>
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr className="text-secondary"></hr>

                    <div className="mt-3">
                        <div className="container mx-auto row text-white">
                            <h2 className="fs-1 mt-2 fw-bolder">Images</h2>
                            <div className="row justify-content-center">
                                {producer.images && producer.images.map(image => (
                                    <ImageCards key={image.public_id} image={image} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProducerDetails

