import React, { Component } from "react";
import axios from 'axios';

export default class EditProducer extends Component {

	constructor(props) {
		super(props);
		this.state = {
            name: '',
            email: '',
            website: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

    componentDidMount() {
        axios.get('http://localhost:5000/producer/' + this.props.match.params.id)
            .then(result => {
                this.setState({
                    name: result.data.producer.name,
                    email: result.data.producer.email,
                    website: result.data.producer.website,
                })
            })
            .catch(err => console.log('Error: ' + err));
    }

	onChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.dataset.name] : e.target.value
		})
	}

	onSubmit (e) {
		e.preventDefault();

		const producer = {
			name: this.state.name,
			email: this.state.email,
			website: this.state.website
		}

		axios.post('http://localhost:5000/producer/update/'+ this.props.match.params.id, producer)
			.then(res => window.location = "/producer")
			.catch(err => console.log('Error: '+ err));
	}

	render() {

		return (
			<div className="container">
				<h1>Create Producer</h1>

				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="control-label">Name</label>
						<input type="text" className="form-control" id="name" data-name="name" onChange={this.onChange} value={this.state.name} required />
					</div>

					<div className="form-group">
						<label className="control-label">Email</label>
						<input type="email" className="form-control" id="email" data-name="email" onChange={this.onChange} value={this.state.email} required />
					</div>

					<div className="form-group">
						<label className="control-label">Website</label>
						<input type="text" className="form-control" id="website" data-name="website" onChange={this.onChange} value={this.state.website} required />
					</div>

					<br/>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>


			</div>
		)

	}

}