import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


import { loadUser } from './actions/authActions';
import store from './store';

import ProtectedRoute from './components/route/ProtectedRoute';

import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile'

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/pages/Home';
import MovieDetails from './components/movie/MovieDetails';

import Actor from './components/pages/Actor';
import ActorDetails from './components/actor/ActorDetails';

import Producer from './components/pages/Producer';
import ProducerDetails from './components/producer/ProducerDetails';

import AdminHeader from './components/admin/AdminHeader';
import Dashboard from './components/admin/Dashboard';

import ActorsLists from './components/actor/ActorsLists';
import NewActor from './components/admin/NewActor';
import UpdateActor from './components/admin/UpdateActor';

import MovieLists from './components/movie/MoviesLists';
import NewMovie from './components/admin/NewMovie';
import UpdateMovie from './components/admin/UpdateMovie';

import ProducersLists from './components/producer/ProducersLists';
import NewProducer from './components/admin/NewProducer';
import UpdateProducer from './components/admin/UpdateProducer';

library.add(fas);
library.add(far);
library.add(fab);

const App = () => {

	let path = window.location.pathname.split('/')[1];

	useEffect(() => {

		store.dispatch(loadUser());

	}, []);

	const { loading: authLoading } = useSelector(state => state.auth);
	const { loading } = useSelector(state => state.movies);

	return (

		<Router>
			<div className="App">
				{/* {!path === "dashboard" ? (<Header/>) : (path === "login" || path === "register" ? null : null)} */}
				{/* {path === "login" || path === "register" ? null : (loading ? null : (path === "dashboard" ? (<AdminHeader/>) : (<Header/>)))} */}
				{authLoading ? null : (path === "login" || path === "register" ? null : ((path === "dashboard" ? (<AdminHeader />) : (<Header />))))}

				<div className={path === "dashboard" ? "home-section" : "container-fluid" }>
					<Route path="/" component={Home} exact />
					<Route path="/movies/search/:keyword" component={Home} />
					<Route path="/movie/:id" component={MovieDetails} exact />

					<Route path="/actors" component={Actor} exact />
					<Route path="/actors/search/:keyword" component={Actor} />
					<Route path="/actor/:id" component={ActorDetails} exact />

					<Route path="/producers" component={Producer} exact />
					<Route path="/producer/:id" component={ProducerDetails} exact />

					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<ProtectedRoute path="/me" component={Profile} exact />

					<ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />

					<ProtectedRoute path="/dashboard/movies" isAdmin={true} component={MovieLists} exact />
					<ProtectedRoute path="/dashboard/movie/add" isAdmin={true} component={NewMovie} exact />
					<ProtectedRoute path="/dashboard/movie/update/:id" isAdmin={true} component={UpdateMovie} exact />
					
					<ProtectedRoute path="/dashboard/actors" isAdmin={true} component={ActorsLists} exact />
					<ProtectedRoute path="/dashboard/actor/add" isAdmin={true} component={NewActor} exact />
					<ProtectedRoute path="/dashboard/actor/update/:id" isAdmin={true} component={UpdateActor} exact />

					<ProtectedRoute path="/dashboard/producers" isAdmin={true} component={ProducersLists} exact />
					<ProtectedRoute path="/dashboard/producer/add" isAdmin={true} component={NewProducer} exact />
					<ProtectedRoute path="/dashboard/producer/update/:id" isAdmin={true} component={UpdateProducer} exact />

				</div>
				{path === "login" || path === "register" ? null : (loading ? null : (path === "dashboard" ? null : (<Footer/>)))}
			</div>
		</Router>
	);
}

export default App;
