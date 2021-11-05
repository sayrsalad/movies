import React, { Component } from "react";
import axios from 'axios';

export default class EditActor extends Component {

	constructor(props) {
		super(props);
		this.state = {
            firstname: '',
            lastname: '',
			profile: '',
            email: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

    componentDidMount() {
        axios.get('http://localhost:5000/api/actor/' + this.props.match.params.id)
            .then(result => {
                this.setState({
                    firstname: result.data.actor.firstname,
                    lastname: result.data.actor.lastname,
                    email: result.data.actor.email,
                })
            })
            .catch(err => console.log('Error: ' + err));
    }

	onChange(e) {
		e.preventDefault();
		this.setState((prevState) => {
			if (e.target.dataset.name === "profile") {
				prevState.profile = e.target.files[0];
			} else {
				prevState[e.target.dataset.name] = e.target.value;
			}
		});
	}

	onSubmit (e) {
		e.preventDefault();

		const actor = new FormData();

		actor.append("firstname", this.state.firstname);
		actor.append("lastname", this.state.lastname);
		actor.append("profile", this.state.profile);
		actor.append("email", this.state.email);

		axios.post('http://localhost:5000/api/actor/update/'+ this.props.match.params.id, actor)
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
						<input type="text" className="form-control" id="firstname" data-name="firstname" onChange={this.onChange} defaultValue={this.state.firstname} required />
					</div>

					<div className="form-group">
						<label className="control-label">Last Name</label>
						<input type="text" className="form-control" id="lastname" data-name="lastname" onChange={this.onChange} defaultValue={this.state.lastname} required />
					</div>

					<div className="mb-3">
						<label htmlFor="profile" className="form-label">Profile</label>
						<input className="form-control" filename="profile" type="file" id="profile" data-name="profile" onChange={this.onChange} required />
					</div>

					<div className="form-group">
						<label className="control-label">Email</label>
						<input type="email" className="form-control" id="email" data-name="email" onChange={this.onChange} defaultValue={this.state.email} required />
					</div>

					<br/>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>


			</div>
		)

	}

}