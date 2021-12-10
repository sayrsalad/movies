import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from 'react-alert';

import { getActorDetails, clearErrors } from '../../actions/actorActions';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import './actor.css';

const ActorDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, actor, error } = useSelector(state => state.actorDetails);

    useEffect(() => {

        dispatch(getActorDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }


    }, [dispatch, alert, error, match.params.id]);

    // const convertDate = (date) => {
    //     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     const dateObject = new Date(date);
    //     const day = dateObject.getDay();
    //     const month = dateObject.getMonth();
    //     const year = dateObject.getFullYear();
    //     return `${monthNames[month]} ${day}, ${year}`;
    // }

    return (
        <Fragment>
            <MetaData title={`${actor.firstname} ${actor.lastname}`} />
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="mt-5">
                        <div className="container mx-auto row text-white justify-content-center">
                            <div className="col-sm-auto">
                                <img src={actor.profile && actor.profile.url} alt={actor.profile && actor.profile.public_id} className="rounded-3 actor-details-poster" />
                            </div>
                            <div className="col ps-5">
                                <h2 className="fs-1 mt-4 md:mt-0 fw-bolder">{actor.firstname} {actor.lastname}</h2>

                                <p className="mt-5 text-white-25">
                                    {actor.biography}
                                </p>
                            </div>
                        </div>
                    </div>


                    <hr className="text-secondary"></hr>

                    <div className="mt-3">
                        <div className="container mx-auto row text-white">
                            <h2 className="fs-1 mt-2 fw-bolder">Movies</h2>
                        </div>
                    </div>

                    <hr className="text-secondary"></hr>

                    <div className="mt-3">
                        <div className="container mx-auto row text-white">
                            <h2 className="fs-1 mt-2 fw-bolder">Images</h2>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ActorDetails

