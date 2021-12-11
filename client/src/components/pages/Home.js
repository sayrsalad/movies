import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import MovieCards from '../movie/MovieCards';
import { getMovies } from '../../actions/movieActions';

import './home.css';

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [rating, setRating] = useState(0);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, movies, error, moviesCount, resPerPage, filteredMoviesCount } = useSelector(state => state.movies);

    const keyword = match.params.keyword;

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getMovies(keyword, currentPage, startDate, endDate, rating));

    }, [dispatch, alert, error, keyword, currentPage, startDate, endDate, rating]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

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

    let count = moviesCount;
    if (keyword) {
        count = filteredMoviesCount
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Home'} />

                    {keyword ? (
                        <Fragment>
                            <div className="row justify-content-center">
                                <div className="col-xl-2 m-4 p-4 mb-5 text-white">
                                    <h5 className="">Search Filter</h5>

                                    <div className="ms-3 py-3">
                                        <h6 className="">Release Date</h6>
                                        {/* <div className="input-group text-white">
                                            <input type="date" className="form-control bg-dark border-0 text-white remove-form-design" placeholder="Start Date" aria-label="Start Date" />

                                            <input type="date" className="form-control bg-dark border-0 text-white remove-form-design" placeholder="End Date" aria-label="End Date" />
                                        </div> */}
                                        <div className="input-group text-white mb-2">
                                            <input type="date" onChange={(e) => setStartDate(e.target.value)} value={startDate} className="form-control bg-dark border-0 text-white remove-form-design" placeholder="Start Date" aria-label="Start Date" />
                                        </div>
                                        <div className="input-group text-white">
                                            <input type="date" onChange={(e) => setEndDate(e.target.value)} value={endDate} className="form-control bg-dark border-0 text-white remove-form-design" placeholder="End Date" aria-label="End Date" />
                                        </div>
                                    </div>

                                    <hr className="text-secondary"></hr>

                                    <div className="ms-3 py-3">
                                        <h6 className="">Ratings</h6>
                                        <ul className="ps-0">
                                            {[5, 4, 3, 2, 1].map(star => (
                                                <li
                                                    style={{
                                                        cursor: 'pointer',
                                                        listStyleType: 'none'
                                                    }}
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                >
                                                    {showRating(star)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <hr className="text-secondary"></hr>
                                </div>
                                <div className="col-lg">
                                    <div className="row justify-content-center my-5">
                                        {movies && movies.map(movie => (
                                            <MovieCards key={movie._id} movie={movie} />
                                        ))}
                                    </div>
                                </div>
                            </div>


                        </Fragment>
                    ) : (
                        <div className="row justify-content-center m-5">
                            {movies && movies.map(movie => (
                                <MovieCards key={movie._id} movie={movie} />
                            ))}
                        </div>
                    )}

                    {resPerPage <= count && (
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
