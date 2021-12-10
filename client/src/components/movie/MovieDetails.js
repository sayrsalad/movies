import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from 'react-alert';

import { getMovieDetails, clearErrors } from '../../actions/movieActions';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import './movie.css';

const MovieDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, movie, error } = useSelector(state => state.movieDetails);

    useEffect(() => {

        dispatch(getMovieDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }


    }, [dispatch, alert, error, match.params.id]);


    const convertDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dateObject = new Date(date);
        const day = dateObject.getDay();
        const month = dateObject.getMonth();
        const year = dateObject.getFullYear();
        return `${monthNames[month]} ${day}, ${year}`;
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={movie.title ? movie.title : ""} />
                    <div className="mt-5">
                        <div className="container mx-auto row text-white justify-content-center">
                            <div className="col-sm-auto">
                                <img src={movie.poster && movie.poster.url} alt={movie.poster && movie.poster.public_id} className="movie-details-poster rounded-3" />
                            </div>
                            <div className="col ps-5">
                                <h2 className="fs-1 mt-4 fw-bolder">{movie.title}</h2>
                                <div className="flex flex-wrap items-center text-white-50 text-sm">
                                    {/* <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg> */}
                                    <FontAwesomeIcon className="text-warning" icon="star" />
                                    <span className="ms-1">{movie.ratings}</span>
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
                </Fragment>
            )}
        </Fragment>
    )
}

export default MovieDetails

