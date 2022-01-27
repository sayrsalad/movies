import React from 'react';
import { Link } from "react-router-dom";

const ProducerCards = (props) => {
    return (
        <Link to={'producer/' + props.producer._id} className="col-sm-auto pb-3">
            <div className="card producer_card border-0 m-0">
                <img src={props.producer.profile.url} className="card-img-top producer-image" alt={props.producer.profile.public_id} />
                <div className="card-body">
                    <h6 className="card-title text-white fw-bold text-truncate">{props.producer.name}</h6>
                    <div className="row">
                        <div className="text-truncate text-white">
                            <small>{props.producer.email}</small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProducerCards
