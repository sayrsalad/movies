import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import { MDBDataTableV5 } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAdminActors, deleteActor, clearErrors } from '../../actions/actorActions';
import { DELETE_ACTOR_RESET } from '../../constants/actorConstants';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

const ActorsLists = ({ history }) => {


    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, actors } = useSelector(state => state.actors);
    const { error: deleteError, isDeleted } = useSelector(state => state.actor);

    useEffect(() => {
        dispatch(getAdminActors());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Actor deleted successfully');
            history.push('/dashboard/actors');
            dispatch({ type: DELETE_ACTOR_RESET });
        }

    }, [dispatch, alert, error, history, deleteError, isDeleted]);

    const setActors = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', width: 230, sort: 'asc' },
                { label: 'Profile', field: 'profile', width: 230, sort: 'disabled' },
                { label: 'Firstname', field: 'firstname', width: 150, sort: 'asc' },
                { label: 'Lastname', field: 'lastname', width: 230, sort: 'asc' },
                { label: 'Biography', field: 'biography', width: 400, sort: 'asc' },
                { label: 'Email', field: 'email', width: 100, sort: 'asc' },
                { label: 'Ratings', field: 'ratings', width: 120, sort: 'asc' },
                { label: 'Reviews', field: 'numOfReviews', width: 230, sort: 'asc' },
                { label: 'Actions', field: 'actions', width: 100 }
            ],
            rows: []
        }

        actors.forEach(actor => {
            data.rows.push({
                id: actor._id,
                profile: <img src={`${actor.profile.url}`} className="rounded poster" alt={`${actor.profile.public_id}`} />,
                firstname: actor.firstname,
                lastname: actor.lastname,
                biography: actor.biography,
                email: actor.email,
                ratings: actor.ratings,
                numOfReviews: actor.numOfReviews,
                actions:
                    <Fragment>
                        <Link to={`/dashboard/actor/update/${actor._id}`} className="btn btn-primary py-1 px-2 me-3">
                            <FontAwesomeIcon icon="pencil-alt" />
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteActorHandler(actor._id)}>
                            <FontAwesomeIcon icon="trash" />
                        </button>
                    </Fragment>
            })
        })

        return data;
    }

    const deleteActorHandler = (id) => {
        dispatch(deleteActor(id));
    }

    return (
        <Fragment>
            <MetaData title={'All Actors'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />
            <div className="container-fluid">
                <Fragment>
                    {loading ? <Loader /> : (
                        <MDBDataTableV5
                            data={setActors()}
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

export default ActorsLists
