import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { getAdminMovies } from '../../actions/movieActions';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.movies);

    useEffect(() => {
        dispatch(getAdminMovies())
    }, [dispatch])

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                     <MetaData title={'Login'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />
                </Fragment>
            )}
        </Fragment>
    )
}

export default Dashboard
