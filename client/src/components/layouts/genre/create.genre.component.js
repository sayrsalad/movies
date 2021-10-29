import React, { Component } from "react";
import axios from 'axios';

export default class CreateGenre extends Component {

	constructor(props) {
		super(props);
		this.state = {
            name: ''
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

		const genre = {
			name: this.state.name
		}

		axios.post('http://localhost:5000/genre/add', genre)
			.then(res => window.location = "/genre")
			.catch(err => console.log('Error: '+ err));
	}

	render() {

		return (
			<div className="container">
				<h1>Create Genre</h1>

				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="control-label">Name</label>
						<input type="text" className="form-control" id="name" data-name="name" onChange={this.onChange} required />
					</div>

					<br/>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>


			</div>
		)

	}

}