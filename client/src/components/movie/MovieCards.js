import React from 'react';
import { Link } from "react-router-dom";

const MovieCards = (props) => {
    return (
        <Link replace  to={'/movie/' + props.movie._id} className="col-sm-auto pb-3">
            <div className="card movie_card border-0 m-0">
                <img src={props.movie.poster.url} className="card-img-top" alt={props.movie.poster.public_id} />
                <div className="card-body pb-3">
                    {/* <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
                    </i> */}
                    <h6 className="card-title text-white fw-bold text-truncate">{props.movie.title}</h6>
                    <small className="text-white text-truncate">{(new Date(props.movie.releaseDate).getFullYear())} | {props.movie.genre} | {props.movie.duration}m</small>
                </div>
            </div>
        </Link>
    )
}

export default MovieCards
