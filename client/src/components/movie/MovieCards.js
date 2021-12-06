import React from 'react';
import { Link } from "react-router-dom";

import './moviecards.css';

const MovieCards = (props) => {
    return (
        <Link to={'movie/' + props.movie._id} className="col-sm-auto">
            <div className="card movie_card border-0 m-0">
                <img src={`../uploads/poster/${props.movie.poster}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                    </i>
                    <h6 className="card-title text-white fw-bold text-truncate">{props.movie.title}</h6>
                    <small className="text-white text-truncate">{(new Date(props.movie.releaseDate).getFullYear())} | {props.movie.genre} | {props.movie.duration}m</small>
                </div>
            </div>
        </Link>
    )
}

export default MovieCards
