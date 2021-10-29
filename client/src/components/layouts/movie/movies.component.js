import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Movie = props => {
    const d = new Date(props.movie.releaseDate);
    props.movie.releaseDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    return (
        <tr>
            <td className="ps-5">{props.movie.title}</td>
            <td>{props.movie.story}</td>
            <td>{props.movie.genre.name}</td>
            <td>{props.movie.releaseDate}</td>
            <td>{props.movie.duration}</td>
            <td className="text-center fs-5">
                <Link className="link-primary" to={'movie/edit/' + props.movie._id}><FontAwesomeIcon icon="pen-square" /></Link>
                <Link className="ms-4 link-danger" to={'/movie'} onClick={() => { props.deleteMovie(props.movie._id) }}><FontAwesomeIcon icon="trash-alt" /></Link>
            </td>
        </tr>
    );
}

export default class Movies extends Component {
    constructor(props) {
        super(props);

        this.state = { movie: [] }

        this.deleteMovie = this.deleteMovie.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/movie')
            .then(res => {
                this.setState({ movie: res.data.movie })
            })
            .catch(err => console.log('Error: ' + err));

    }

    deleteMovie(id) {
        axios.delete('http://localhost:5000/movie/' + id)
            .then(res => console.log(res.data.message))
            .catch(err => console.log('Error: ' + err));
        this.setState({
            movie: this.state.movie.filter(el => el._id !== id)
        });
    }

    movies() {
        return this.state.movie.map(currentMovie => {
            return <Movie movie={currentMovie} deleteMovie={this.deleteMovie} key={currentMovie._id} />
        });
    }

    render() {

        return (
            <div className="container">
                <Link className="mb-3 btn btn-primary" to="/movie/create">Add Movie</Link>

                <table className="table table-striped table-borderless table-dark rounded-3 overflow-hidden">
                    <thead>
                        <tr>
                            <th className="ps-5" scope="col">Title</th>
                            <th scope="col">Story</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Release Date</th>
                            <th scope="col">Duration</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.movies()}
                    </tbody>
                </table>
            </div>
        )

    }
}