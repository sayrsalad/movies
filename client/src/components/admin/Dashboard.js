import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { getAdminMovies } from '../../actions/movieActions';
import { getAdminActors } from '../../actions/actorActions';
import { getAdminProducers } from '../../actions/producerActions';
import { allUsers } from '../../actions/authActions';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {

    const dispatch = useDispatch();

    const { movies, loading } = useSelector(state => state.movies);
    const { actors } = useSelector(state => state.actors);
    const { producers } = useSelector(state => state.producers);
    const { users } = useSelector(state => state.allUsers);

    useEffect(() => {
        dispatch(getAdminMovies());
        dispatch(getAdminActors());
        dispatch(getAdminProducers());
        dispatch(allUsers());
    }, [dispatch]);

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

    const genreCounts = [];

    genres.forEach(genre => {
        var search = genre;

        var count = movies.reduce(function (n, val) {
            return n + (val.genre === search);
        }, 0);

        const g = {};
        g.name = genre;
        g.count = count;
        genreCounts.push(g);
    });

    const topHighestRatedMovies = movies.sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings)).slice(0, 10);
    const topHighRatedActors = actors.sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings)).slice(0, 10);
    const topGenres = genreCounts.sort((a, b) => parseFloat(b.count) - parseFloat(a.count)).slice(0, 10);
    const topHighestGrossingMovies = movies.sort((a, b) => parseFloat(b.numOfReviews) - parseFloat(a.numOfReviews)).slice(0, 10);

    let titles = topHighestRatedMovies.map(a => a.title);
    let ratings = topHighestRatedMovies.map(a => a.ratings);

    let grossingtitles = topHighestGrossingMovies.map(a => a.title);
    let numOfReviews = topHighestGrossingMovies.map(a => a.numOfReviews);

    let names = topHighRatedActors.map(a => `${a.firstname} ${a.lastname}`);
    let actorRatings = topHighRatedActors.map(a => a.ratings);

    let genre_names = topGenres.map(a => a.name);
    let genre_counts = topGenres.map(a => a.count);


    const data = {
        labels: titles,
        datasets: [
            {
                label: 'Ratings',
                data: ratings,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ]
            }
        ]
    };

    const actorData = {
        labels: names,
        datasets: [
            {
                label: 'Ratings',
                data: actorRatings,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ]
            }
        ]
    };

    const genreData = {
        labels: genre_names,
        datasets: [
            {
                label: 'Number of Reviews',
                data: genre_counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ]
            }
        ]
    };

    const grossingData = {
        labels: grossingtitles,
        datasets: [
            {
                label: 'Number of Reviews',
                data: numOfReviews,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ]
            }
        ]
    };

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Admin Dashboard'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />

                    {loading ? <Loader /> : (
                        <Fragment>

                            <div className="container-fluid">
                                {/* <div className="row mt-5 mb-4">
                                    <div className="col-xl-12 col-sm-12">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Registered Users<br /> <b>{users && users.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/dashboard/movies">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="row pr-4 pt-4">
                                    <div className="col-xl-3 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Registered Users<br /> <b>{users && users.length}</b></div>
                                            </div>
                                            {/* <Link className="card-footer text-white clearfix small z-1" to="/dashboard/movies">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link> */}
                                        </div>
                                    </div>

                                    <div className="col-xl-3 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100 border-0 shadow">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Movies<br /> <b>{movies && movies.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/dashboard/movies">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Actors<br /><b>{actors && actors.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/dashboard/actors">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Producers<br /><b>{producers && producers.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/dashboard/producers">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                                <div className="row p-5">
                                    <Bar
                                        data={data}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Highest Rated Movies',
                                                    font: {
                                                        size: 30
                                                    }
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'bottom'
                                                }
                                            }

                                        }}
                                    />
                                </div>

                                <div className="row p-5">
                                    <Bar
                                        data={actorData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Highest Rated Actors',
                                                    font: {
                                                        size: 30
                                                    }
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'bottom'
                                                }
                                            }

                                        }}
                                    />
                                </div>

                                <div className="row p-5">
                                    <Bar
                                        data={genreData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Popular Movie Genres',
                                                    font: {
                                                        size: 30
                                                    }
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'bottom'
                                                }
                                            }

                                        }}
                                    />
                                </div>

                                <div className="row p-5">
                                    <Bar
                                        data={grossingData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Highest Grossing Movies',
                                                    font: {
                                                        size: 30
                                                    }
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'bottom'
                                                }
                                            }

                                        }}
                                    />
                                </div>

                            </div>

                        </Fragment>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Dashboard
