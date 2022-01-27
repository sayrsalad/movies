import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newMovie, clearErrors } from '../../actions/movieActions';
import { NEW_MOVIE_RESET } from '../../constants/movieConstants';

const NewMovie = ({ history }) => {

    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [duration, setDuration] = useState('');
    const [genre, setGenre] = useState(0);
    const [story, setStory] = useState('');
    const [poster, setPoster] = useState('');
    const [posterPreview, setPosterPreview] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const genres = [
        "Action",
        "Adventure",
        "Animated",
        "Biography",
        "Comedy",
        "Crime",
        "Dance",
        "Disaster",
        "Documentary",
        "Drama",
        "Erotic",
        "Family",
        "Fantasy",
        "Found Footage",
        "Historical",
        "Horror",
        "Independent",
        "Legal",
        "Live Action",
        "Martial Arts",
        "Musical",
        "Mystery",
        "Noir",
        "Performance",
        "Political",
        "Romance",
        "Satire",
        "Science Fiction",
        "Short",
        "Silent",
        "Slasher",
        "Sports",
        "Spy",
        "Superhero",
        "Supernatural",
        "Suspense",
        "Teen",
        "Thriller",
        "War",
        "Western"
    ];

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newMovie);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/dashboard/movies');
            alert.success('Movie created successfully');
            dispatch({ type: NEW_MOVIE_RESET })
        }

    }, [dispatch, alert, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', title);
        formData.set('releaseDate', releaseDate);
        formData.set('duration', duration);
        formData.set('genre', genre);
        formData.set('story', story);
        formData.set('poster', poster);

        images.forEach(image => {
            formData.append('images', image);
        });

        dispatch(newMovie(formData));
    }

    const onChange = e => {

        if (e.target.id === 'poster') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPosterPreview(reader.result);
                    setPoster(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);

        } else if (e.target.id === 'images') {
            const files = Array.from(e.target.files)

            setImagesPreview([]);
            setImages([]);

            files.forEach(file => {
                const reader = new FileReader();

                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImagesPreview(oldArray => [...oldArray, reader.result]);
                        setImages(oldArray => [...oldArray, reader.result]);
                    }
                }

                reader.readAsDataURL(file);
            });
        }
    }

    return (
        <Fragment>
            <MetaData title={'New Movie'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                        <Fragment>
                            <div className="wrapper my-5">
                                <form className="shadow-lg p-5 rounded-3 clearfix" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <h1 className="mb-4">New Movie</h1>

                                    <div className="form-group mb-3">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="releaseDate">Release Date</label>
                                        <input type="date" id="releaseDate" className="form-control" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="duration">Duration</label>
                                        <input type="number" id="duration" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} required/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="genre">Genre</label>
                                        <select className="form-control" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                                        <option value="0" disabled>-- Select Genre --</option>
                                            {genres.map(genre => (
                                                <option key={genre} value={genre} >{genre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="story">Story</label>
                                        <textarea className="form-control" id="story" rows="5" value={story} onChange={(e) => setStory(e.target.value)} required></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="poster" className="form-label">Poster</label>
                                        <input className="form-control" filename="poster" type="file" id="poster" data-name="poster" onChange={onChange} required />

                                        {posterPreview ? <img src={posterPreview} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" /> : null}
                                            

                                    </div>


                                    <div className='form-group mb-3'>
                                        <label htmlFor="images" className="form-label">Images</label>
                                        <input className="form-control" filename="images" type="file" id="images" data-name="images" onChange={onChange} required multiple />

                                        {imagesPreview.map(img => (
                                            <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                        ))}

                                    </div>


                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3 float-end"
                                        disabled={loading ? true : false}>
                                        CREATE
                                    </button>

                                </form>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default NewMovie
