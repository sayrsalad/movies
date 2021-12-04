import React, { Fragment, useEffect } from 'react';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import MovieCards from '../movie/MovieCards';

import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../actions/movieActions';

import { useAlert } from 'react-alert';

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, 
            movies, 
            error, 
            // moviesCount
        } = useSelector(state => state.movies);

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getMovies());


    }, [dispatch, alert, error]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Home'} />
                    <div className="row justify-content-center">
                        {movies && movies.map(movie => (
                            <MovieCards key={movie._id} movie={movie}/>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home
