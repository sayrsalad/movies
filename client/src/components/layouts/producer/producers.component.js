import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Producer = props => {
    return (
        <tr>
            <td className="ps-5">{props.producer.name}</td>
            <td>{props.producer.email}</td>
            <td>{props.producer.website}</td>
            <td className="text-center fs-5">
                <Link className="link-primary" to={'/producer/edit/' + props.producer._id}><FontAwesomeIcon icon="pen-square" /></Link>
                <Link className="ms-4 link-danger" to={'/producer'} onClick={() => { props.deleteProducer(props.producer._id) }}><FontAwesomeIcon icon="trash-alt" /></Link>
            </td>
        </tr>
    );
}

export default class Producers extends Component {
    constructor(props) {
        super(props);

        this.state = { producer: [] }

        this.deleteProducer = this.deleteProducer.bind(this);

        this.config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/producer', this.config)
            .then(res => {
                this.setState({ producer: res.data.producer })
            })
            .catch(err => console.log('Error: ' + err));

    }

    deleteProducer(id) {
        axios.delete('http://localhost:5000/api/producer/' + id, this.config)
            .then(res => console.log(res.data.message))
            .catch(err => console.log('Error: ' + err));
        this.setState({
            producer: this.state.producer.filter(el => el._id !== id)
        });
    }

    producers() {
        return this.state.producer.map(currentProducer => {
            return <Producer producer={currentProducer} deleteProducer={this.deleteProducer} key={currentProducer._id} />
        });
    }

    render() {

        return (
            <div className="container table-responsive">
                <Link className="mb-3 btn btn-primary" to="/producer/create">Add Producer</Link>

                <table className="table table-striped table-borderless table-dark rounded-3 overflow-hidden">
                    <thead>
                        <tr>
                            <th className="ps-5" scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Website</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.producers()}
                    </tbody>
                </table>
            </div>
        )

    }
}