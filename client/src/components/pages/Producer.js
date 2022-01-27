import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import ProducerCards from '../producer/ProducerCards';
import { getProducers } from '../../actions/producerActions';

import './home.css';

const Producer = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, producers, error, producersCount, resPerPage } = useSelector(state => state.producers);

    const keyword = match.params.keyword;

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getProducers(keyword, currentPage));


    }, [dispatch, alert, error, keyword, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Producers'} />
                    <div className="row justify-content-center m-5">
                        {producers && producers.map(producer => (
                            <ProducerCards key={producer._id} producer={producer} />
                        ))}
                    </div>

                    {resPerPage <= producersCount && (
                        <div className="d-flex justify-content-center mt-5 main-pagination">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={producersCount}
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

export default Producer
