import React, { Component } from "react";
import axios from 'axios';

export default class CreateActor extends Component {

	constructor(props) {
		super(props);
		this.state = {
            firstname: '',
            lastname: '',
            email: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.dataset.name] : e.target.value
		})
	}

	onSubmit (e) {
		e.preventDefault();

		const actor = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			email: this.state.email
		}

		axios.post('http://localhost:5000/actor/add', actor)
			.then(res => window.location = "/actor")
			.catch(err => console.log('Error: '+ err));
	}

	render() {

		return (
			<div className="container">
				<h1>Create Actor</h1>

				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="control-label">First Name</label>
						<input type="text" className="form-control" id="firstname" data-name="firstname" onChange={this.onChange} required />
					</div>

					<div className="form-group">
						<label className="control-label">Last Name</label>
						<input type="text" className="form-control" id="lastname" data-name="lastname" onChange={this.onChange} required />
					</div>

					<div className="form-group">
						<label className="control-label">Email</label>
						<input type="email" className="form-control" id="email" data-name="email" onChange={this.onChange} required />
					</div>

					<br/>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>


			</div>
		)

	}

}