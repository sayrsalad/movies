import React, { Component } from "react";
import axios from 'axios';

const Genre = props => {
	return (
		<option value={props.genre._id}>{props.genre.name}</option>
	);
}

export default class CreateMovie extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			poster: '',
			story: '',
			releaseDate: '',
			duration: '',
			genreA: [],
			genre: {
				_id: '',
				name: ''
			}
		}

		this.config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.genres = this.genres.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:5000/api/genre', this.config)
			.then(res => {
				this.setState({ genreA: res.data.genre })
			})
			.catch(err => console.log('Error: ' + err));

	}

	onChange(e) {
		this.setState((prevState) => {
			if (e.target.dataset.name === "genre") {
				prevState.genre._id = e.target.value;
				prevState.genre.name = e.target.options[e.target.options.selectedIndex].text;
			} else if (e.target.dataset.name === "poster") {
				prevState.poster = e.target.files[0];
			} else {
				prevState[e.target.dataset.name] = e.target.value;
			}
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const movie = new FormData();

		movie.append("title", this.state.title);
		movie.append("poster", this.state.poster);
		movie.append("story", this.state.story);
		movie.append("releaseDate", this.state.releaseDate);
		movie.append("duration", this.state.duration);
		movie.append("genre[_id]", this.state.genre._id);
		movie.append("genre[name]", this.state.genre.name);

		axios.post('http://localhost:5000/api/movie/add', movie, this.config)
			.then(res => window.location = "/movie")
			.catch(err => console.log('Error: ' + err));

	}

	genres() {
		return this.state.genreA.map(currentGenre => {
			return <Genre genre={currentGenre} key={currentGenre._id} />
		});
	}

	render() {

		return (
			<div className="container">
				<h1>Create Movie</h1>

				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="title" className="control-label">Title</label>
						<input type="text" className="form-control" id="title" data-name="title" onChange={this.onChange} required />
					</div>

					<div className="mb-3">
						<label htmlFor="poster" className="form-label">Poster</label>
						<input className="form-control" filename="poster" type="file" id="poster" data-name="poster" onChange={this.onChange} required />
					</div>

					<div className="form-group">
						<label htmlFor="story" className="control-label">Story</label>
						<input type="text" className="form-control" id="story" data-name="story" onChange={this.onChange} required />
					</div>

					<div className="form-group">
						<label htmlFor="genre" className="control-label">Genre</label>
						<select className="form-control" data-name="genre" onChange={this.onChange} defaultValue={'0'} required>
							<option value="0" disabled>-- Select Genre --</option>
							{this.genres()}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="releaseDate" className="control-label">Release Date</label>
						<input type="date" className="form-control" id="releaseDate" data-name="releaseDate" onChange={this.onChange} required />
					</div>

					<div className="form-group">
						<label htmlFor="duration" className="control-label">Duration</label>
						<input type="number" className="form-control" id="duration" data-name="duration" onChange={this.onChange} required />
					</div>

					<br />
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>


			</div>
		)

	}

}