import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import { MDBDataTableV5 } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAdminProducers, deleteProducer, clearErrors } from '../../actions/producerActions';
import { DELETE_PRODUCER_RESET } from '../../constants/producerConstants';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

const ProducersLists = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, producers } = useSelector(state => state.producers);
    const { error: deleteError, isDeleted } = useSelector(state => state.producer);

    useEffect(() => {
        dispatch(getAdminProducers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Producer deleted successfully');
            history.push('/dashboard/producers');
            dispatch({ type: DELETE_PRODUCER_RESET });
        }

    }, [dispatch, alert, error, history, deleteError, isDeleted]);

    const setProducers = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', width: 230, sort: 'asc' },
                { label: 'Profile', field: 'profile', width: 230, sort: 'disabled' },
                { label: 'Name', field: 'name', width: 230, sort: 'asc' },
                { label: 'Email', field: 'email', width: 150, sort: 'asc' },
                { label: 'Website', field: 'website', width: 230, sort: 'asc' },
                { label: 'Actions', field: 'actions', width: 100 }
            ],
            rows: []
        }

        producers.forEach(producer => {
            data.rows.push({
                id: producer._id,
                profile: <img src={`${producer.profile.url}`} className="rounded poster" alt={`${producer.profile.public_id}`} />,
                name: producer.name,
                email: producer.email,
                website: producer.website,
                actions:
                    <Fragment>
                        <Link to={`/dashboard/producer/update/${producer._id}`} className="btn btn-primary py-1 px-2 me-3">
                            <FontAwesomeIcon icon="pencil-alt" />
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProducerHandler(producer._id)}>
                            <FontAwesomeIcon icon="trash" />
                        </button>
                    </Fragment>
            })
        })

        return data;
    }

    const deleteProducerHandler = (id) => {
        dispatch(deleteProducer(id));
    }

    return (
        <Fragment>
            <MetaData title={'All Producers'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />
            <div className="container-fluid">
                <Fragment>
                    {loading ? <Loader /> : (
                        <MDBDataTableV5
                            data={setProducers()}
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

export default ProducersLists
