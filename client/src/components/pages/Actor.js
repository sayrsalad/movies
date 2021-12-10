import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import ActorCards from '../actor/ActorCards';
import { getActors } from '../../actions/actorActions';

import './home.css';

const Actor = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, actors, error, actorsCount, resPerPage } = useSelector(state => state.actors);

    const keyword = match.params.keyword;

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getActors(keyword, currentPage));


    }, [dispatch, alert, error, keyword, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Actors'} />
                    <div className="row justify-content-center m-5">
                        {actors && actors.map(actor => (
                            <ActorCards key={actor._id} actor={actor} />
                        ))}
                    </div>

                    {resPerPage <= actorsCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={actorsCount}
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

export default Actor
