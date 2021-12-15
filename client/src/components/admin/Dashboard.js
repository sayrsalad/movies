import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { getAdminMovies } from '../../actions/movieActions';
import { allUsers } from '../../actions/authActions';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { movies, loading } = useSelector(state => state.movies);
    const { users } = useSelector(state => state.allUsers);

    useEffect(() => {
        dispatch(getAdminMovies());
        dispatch(allUsers());
    }, [dispatch])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Admin Dashboard'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />

                    {loading ? <Loader /> : (
                        <Fragment>

                            <div className="container-fluid">
                                <div className="row mt-5 mb-4">
                                    <div className="col-xl-12 col-sm-12">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                                <div className="text-center card-font-size">Registered Users<br /> <b>{users && users.length}</b></div>
                                            </div>
                                            {/* <Link className="card-footer text-white clearfix small z-1" to="/dashboard/movies">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="row pr-4">
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Movies<br /> <b>{movies && movies.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/movie/admin">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    {/* <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div> */}

                                    {/* 
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div> */}

                                    {/* 
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-warning o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                        </Fragment>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Dashboard
