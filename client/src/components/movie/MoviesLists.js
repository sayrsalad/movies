import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import { MDBDataTableV5 } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAdminMovies, clearErrors } from '../../actions/movieActions';
// import { NEW_MOVIE_REVIEW_RESET } from '../../constants/movieConstants';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

const MoviesLists = ({ history }) => {


    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, movies } = useSelector(state => state.movies);
    // const { error: deleteError, isDeleted } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getAdminMovies());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     alert.success('Movie deleted successfully');
        //     history.push('/movie/admin');
        //     dispatch({ type: DELETE_MOVIE_RESET })
        // }

    }, [dispatch, alert, error, history])

    const setMovies = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', width: 210, sort: 'asc' },
                { label: 'Title', field: 'title', width: 150, sort: 'asc' },
                { label: 'Poster', field: 'poster', width: 230, sort: 'disabled' },
                { label: 'Release Date', field: 'releaseDate', width: 230, sort: 'asc' },
                { label: 'Duration', field: 'duration', width: 100, sort: 'asc' },
                { label: 'Genre', field: 'genre', width: 120, sort: 'asc' },
                { label: 'Ratings', field: 'ratings', width: 230, sort: 'asc' },
                { label: 'Reviews', field: 'numOfReviews', width: 230, sort: 'asc' },
                { label: 'Actions', field: 'actions', width: 100 }
            ],
            rows: []
        }

        movies.forEach(movie => {
            const date = new Date(movie.releaseDate);
            data.rows.push({
                id: movie._id,
                title: movie.title,
                poster: <img src={`${movie.poster.url}`} className="rounded poster" alt={`${movie.poster.public_id}`} />,
                releaseDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
                duration: movie.duration,
                genre: movie.genre,
                ratings: movie.ratings,
                numOfReviews: movie.numOfReviews,
                actions:
                    <Fragment>
                        <Link to={`/admin/movie/${movie._id}`} className="btn btn-primary py-1 px-2 me-3">
                            <FontAwesomeIcon icon="pencil-alt" />
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteMovieHandler(movie._id)}>
                            <FontAwesomeIcon icon="trash" />
                        </button>
                    </Fragment>
            })
        })

        return data;
    }

    const deleteMovieHandler = (id) => {
        // dispatch(deleteMovie(id));
    }

    return (
        <Fragment>
            <MetaData title={'All Movies'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />
            <div className="container-fluid">
                <Fragment>
                    {loading ? <Loader /> : (
                        <MDBDataTableV5
                            data={setMovies()}
                            striped
                            hover
                            scrollX
                            scrollY
                            maxHeight='75vh'
                        />
                    )}
                </Fragment>
            </div>
        </Fragment>
    )
}

export default MoviesLists
