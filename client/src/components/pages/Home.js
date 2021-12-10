import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import MovieCards from '../movie/MovieCards';
import { getMovies } from '../../actions/movieActions';

import './home.css';

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, movies, error, moviesCount, resPerPage } = useSelector(state => state.movies);

    const keyword = match.params.keyword;

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getMovies(keyword, currentPage));


    }, [dispatch, alert, error, keyword, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }
   
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Home'} />
                    <div className="row justify-content-center m-5">
                        {movies && movies.map(movie => (
                            <MovieCards key={movie._id} movie={movie} />
                        ))}
                    </div>

                    {resPerPage <= moviesCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={moviesCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link bg-transparent border-0 pagination-item"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home
