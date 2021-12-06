import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getMovieDetails, clearErrors } from '../../actions/movieActions';

import { useAlert } from 'react-alert';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import './moviedetails.css';

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
            <MetaData title={movie.title} />
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="mt-5">
                        <div className="container mx-auto row text-white">
                            <div className="col-sm-auto">
                                <img src={`../uploads/poster/${movie.poster}`} alt="poster" className="w-64 lg:w-96 rounded-3" />
                            </div>
                            <div className="col ps-5">
                                <h2 className="fs-1 mt-4 md:mt-0 fw-bolder">{movie.title}</h2>
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
                                {/* 
                <div x-data="{ isOpen: false }">
                    @if (count($movie['videos']['results']) > 0)
                        <div className="mt-12">
                            <button
                                @click="isOpen = true"
                                className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded fw-bolder px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
                            >
                                <svg className="w-6 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                                <span className="ml-2">Play Trailer</span>
                            </button>
                        </div>

                        <template x-if="isOpen">
                            <div
                                style="background-color: rgba(0, 0, 0, .5);"
                                className="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto"
                            >
                                <div className="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
                                    <div className="bg-gray-900 rounded">
                                        <div className="flex justify-end pr-4 pt-2">
                                            <button
                                                @click="isOpen = false"
                                                @keydown.escape.window="isOpen = false"
                                                className="text-3xl leading-none hover:text-gray-300">&times;
                                            </button>
                                        </div>
                                        <div className="modal-body px-8 py-8">
                                            <div className="responsive-container overflow-hidden relative" style="padding-top: 56.25%">
                                                <iframe className="responsive-iframe absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/{{ $movie['videos']['results'][0]['key'] }}" style="border:0;" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    @endif


                </div> */}

                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default MovieDetails

