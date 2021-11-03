import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Actor = props => {
    return (
        <tr>
            <td className="ps-5"><img src={`../uploads/profile/${props.actor.profile}`} className="rounded poster" alt="..."/></td>
            <td>{props.actor.firstname}</td>
            <td>{props.actor.lastname}</td>
            <td>{props.actor.email}</td>
            <td className="text-center fs-5">
                <Link className="link-primary" to={'/actor/edit/' + props.actor._id}><FontAwesomeIcon icon="pen-square" /></Link>
                <Link className="ms-4 link-danger" to={'/actor'} onClick={() => { props.deleteActor(props.actor._id) }}><FontAwesomeIcon icon="trash-alt" /></Link>
            </td>
        </tr>
    );
}

export default class Actors extends Component {
    constructor(props) {
        super(props);

        this.state = { actor: [] }

        this.deleteActor = this.deleteActor.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/actor')
            .then(res => {
                this.setState({ actor: res.data.actor })
            })
            .catch(err => console.log('Error: ' + err));

    }

    deleteActor(id) {
        axios.delete('http://localhost:5000/actor/' + id)
            .then(res => console.log(res.data.actor))
            .catch(err => console.log('Error: ' + err));
        this.setState({
            actor: this.state.actor.filter(el => el._id !== id)
        });
    }

    actors() {
        return this.state.actor.map(currentActor => {
            return <Actor actor={currentActor} deleteActor={this.deleteActor} key={currentActor._id} />
        });
    }

    render() {

        return (
            <div className="container">
                <Link className="mb-3 btn btn-primary" to="/actor/create">Add Actor</Link>

                <table className="table table-striped table-borderless table-dark rounded-3 overflow-hidden">
                    <thead>
                        <tr>
                            <th className="ps-5" scope="col">Profile</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.actors()}
                    </tbody>
                </table>
            </div>
        )

    }
}