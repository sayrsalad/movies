import React from 'react';
import { Link } from "react-router-dom";



const ActorCards = (props) => {
    return (
        <Link to={'actor/' + props.actor._id} className="col-sm-auto pb-3">
            <div className="card actor_card border-0 m-0">
                <img src={props.actor.profile.url} className="card-img-top" alt={props.actor.profile.public_id} />
                <div className="card-body">
                    <h6 className="card-title text-white fw-bold text-truncate">{props.actor.firstname} {props.actor.lastname}</h6>
                    <div className="row">
                        <div className="text-truncate text-white">
                            <small>{props.actor.biography}</small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ActorCards
