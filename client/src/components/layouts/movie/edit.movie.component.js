import React, { Component } from "react";
import axios from 'axios';

export default class EditMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            story: '',
            releaseDate: '',
            duration: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/movie/' + this.props.match.params.id)
            .then(result => {
                const d = new Date(result.data.movie.releaseDate);
                result.data.movie.releaseDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
                this.setState({
                    title: result.data.movie.title,
                    story: result.data.movie.story,
                    releaseDate: result.data.movie.releaseDate,
                    duration: result.data.movie.duration
                })
            })
            .catch(err => console.log('Error: ' + err));
    }

    onChange(e) {
        this.setState({
            [e.target.dataset.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const movie = {
            title: this.state.title,
            story: this.state.story,
            releaseDate: this.state.releaseDate,
            duration: this.state.duration
        }

        axios.post('http://localhost:5000/movie/update/' + this.props.match.params.id, movie)
            .then(res => window.location = "/movie")
            .catch(err => console.log('Error: ' + err));
    }

    render() {

        return (
            <div className="container">
                <h1>Update Movie</h1>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="control-label">Title</label>
                        <input type="text" className="form-control" id="title" data-name="title" onChange={this.onChange} value={this.state.title} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="story" className="control-label">Story</label>
                        <input type="text" className="form-control" id="story" data-name="story" onChange={this.onChange} value={this.state.story} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="releaseDate" className="control-label">Release Date</label>
                        <input type="date" className="form-control" id="releaseDate" data-name="releaseDate" onChange={this.onChange} value={this.state.releaseDate} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration" className="control-label">Duration</label>
                        <input type="number" className="form-control" id="duration" data-name="duration" onChange={this.onChange} value={this.state.duration} required />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>


            </div>
        )

    }

}