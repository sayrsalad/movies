import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Genre = props => {
    return (
        <tr>
            <td className="ps-5">{props.genre.name}</td>
            <td className="text-center fs-5">
                <Link className="link-primary" to={'/genre/edit/' + props.genre._id}><FontAwesomeIcon icon="pen-square" /></Link>
                <Link className="ms-4 link-danger" to={'/genre'} onClick={() => { props.deleteGenre(props.genre._id) }}><FontAwesomeIcon icon="trash-alt" /></Link>
            </td>
        </tr>
    );
}

export default class Genres extends Component {
    constructor(props) {
        super(props);

        this.state = { genre: [] }

        this.deleteGenre = this.deleteGenre.bind(this);

        this.config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/genre', this.config)
            .then(res => {
                this.setState({ genre: res.data.genre })
            })
            .catch(err => console.log('Error: ' + err));
    }

    deleteGenre(id) {
        axios.delete('http://localhost:5000/api/genre/' + id, this.config)
            .then(res => console.log(res.data.message))
            .catch(err => console.log('Error: ' + err));
        this.setState({
            genre: this.state.genre.filter(el => el._id !== id)
        });
    }

    genres() {
        return this.state.genre.map(currentGenre => {
            return <Genre genre={currentGenre} deleteGenre={this.deleteGenre} key={currentGenre._id} />
        });
    }

    render() {

        return (
            <div className="container">
                <Link className="mb-3 btn btn-primary" to="/genre/create">Add Genre</Link>

                <table className="table table-striped table-borderless table-dark rounded-3 overflow-hidden">
                    <thead>
                        <tr>
                            <th className="ps-5" scope="col">Name</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.genres()}
                    </tbody>
                </table>
            </div>
        )

    }
}