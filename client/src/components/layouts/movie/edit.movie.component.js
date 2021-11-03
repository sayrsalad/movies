import React, { Component } from "react";
import axios from 'axios';

const Genre = props => {
    return (
        <option value={props.genre._id}>{props.genre.name}</option>
    );
}

export default class EditMovie extends Component {

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

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.genres = this.genres.bind(this);
    }

    componentDidMount() {
        const movie = 'http://localhost:5000/movie/' + this.props.match.params.id;
        const genres = 'http://localhost:5000/genre';

        const movieReq = axios.get(movie);
        const genresReq = axios.get(genres);

        axios.all([movieReq, genresReq])
            .then(axios.spread((...res) => {
                const movieRes = res[0];
                const genresRes = res[1];

                const d = new Date(movieRes.data.movie.releaseDate);
                movieRes.data.movie.releaseDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

                this.setState({
                    title: movieRes.data.movie.title,
                    poster: movieRes.data.movie.poster,
                    story: movieRes.data.movie.story,
                    releaseDate: movieRes.data.movie.releaseDate,
                    duration: movieRes.data.movie.duration,
                    genreA: genresRes.data.genre,
                    genre: {
                        _id: movieRes.data.movie.genre._id,
                        name: movieRes.data.movie.genre.name
                    }
                })


            }))
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

        axios.post('http://localhost:5000/movie/update/' + this.props.match.params.id, movie)
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
                <h1>Update Movie</h1>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="control-label">Title</label>
                        <input type="text" className="form-control" id="title" data-name="title" onChange={this.onChange} defaultValue={this.state.title} required />
                    </div>

                    <div className="mb-3">
						<label htmlFor="poster" className="form-label">Poster</label>
						<input className="form-control" filename="poster" type="file" id="poster" data-name="poster" onChange={this.onChange}  required />
					</div>

                    <div className="form-group">
                        <label htmlFor="story" className="control-label">Story</label>
                        <input type="text" className="form-control" id="story" data-name="story" onChange={this.onChange} defaultValue={this.state.story} required />
                    </div>
                    
					<div className="form-group">
						<label htmlFor="genre" className="control-label">Genre</label>
						<select className="form-control" data-name="genre" onChange={this.onChange} defaultValue={this.state.genre._id} required>
							<option value="0" disabled>-- Select Genre --</option>
							{this.genres()}
						</select>
					</div>

                    <div className="form-group">
                        <label htmlFor="releaseDate" className="control-label">Release Date</label>
                        <input type="date" className="form-control" id="releaseDate" data-name="releaseDate" onChange={this.onChange} defaultValue={this.state.releaseDate} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration" className="control-label">Duration</label>
                        <input type="number" className="form-control" id="duration" data-name="duration" onChange={this.onChange} defaultValue={this.state.duration} required />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )

    }

}