import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
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
import ActorDetails from './components/actor/ActorDetails'

import AdminHeader from './components/admin/AdminHeader';
import Dashboard from './components/admin/Dashboard';

// import Navbar from './components/layouts/navbar.component';

// import Home from './components/layouts/home.component';

// import Movies from './components/layouts/movie/movies.component';
// import CreateMovie from './components/layouts/movie/create.movie.component';
// import EditMovie from './components/layouts/movie/edit.movie.component';

// import Actors from './components/layouts/actor/actors.component';
// import CreateActor from './components/layouts/actor/create.actor.component';
// import EditActor from './components/layouts/actor/edit.actor.component';

// import Genres from './components/layouts/genre/genres.component';
// import CreateGenre from './components/layouts/genre/create.genre.component';
// import EditGenre from './components/layouts/genre/edit.genre.component';

// import Producers from './components/layouts/producer/producers.component';
// import CreateProducer from './components/layouts/producer/create.producer.component';
// import EditProducer from './components/layouts/producer/edit.producer.component';

library.add(fas);
library.add(far);

const App = () => {

	let path = window.location.pathname.slice(1);

	useEffect(() => {

		store.dispatch(loadUser());

	}, []);

	// const { user, isAuthenticated } = useSelector(state => state.auth);
	const { loading } = useSelector(state => state.movies);

	return (

		// 				<br />
		// 				<PrivateRoute path="/" exact component={Home} />

		// 				<PrivateRoute path="/movie" exact component={Movies} />
		// 				<PrivateRoute path="/movie/create" component={CreateMovie} />
		// 				<PrivateRoute path="/movie/edit/:id" component={EditMovie} />

		// 				<PrivateRoute path="/actor" exact component={Actors} />
		// 				<PrivateRoute path="/actor/create" component={CreateActor} />
		// 				<PrivateRoute path="/actor/edit/:id" component={EditActor} />

		// 				<PrivateRoute path="/genre" exact component={Genres} />
		// 				<PrivateRoute path="/genre/create" component={CreateGenre} />
		// 				<PrivateRoute path="/genre/edit/:id" component={EditGenre} />

		// 				<PrivateRoute path="/producer" exact component={Producers} />
		// 				<PrivateRoute path="/producer/create" component={CreateProducer} />
		// 				<PrivateRoute path="/producer/edit/:id" component={EditProducer} />

		<Router>
			<div className="App">
				{/* {!path === "dashboard" ? (<Header/>) : (path === "login" || path === "register" ? null : null)} */}
				{/* {path === "login" || path === "register" ? null : (loading ? null : (path === "dashboard" ? (<AdminHeader/>) : (<Header/>)))} */}
				{loading ? null : (path === "login" || path === "register" ? null : ((path === "dashboard" ? (<AdminHeader />) : (<Header />))))}

				<div className="container-fluid">
					<Route path="/" component={Home} exact />
					<Route path="/movies/search/:keyword" component={Home} />
					<Route path="/movie/:id" component={MovieDetails} exact />

					<Route path="/actors" component={Actor} exact />
					<Route path="/actors/search/:keyword" component={Actor} />
					<Route path="/actor/:id" component={ActorDetails} exact />

					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<ProtectedRoute path="/me" component={Profile} exact />

					<ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
				</div>
				{path === "login" || path === "register" ? null : (loading ? null : (path === "dashboard" ? null : (<Footer/>)))}
			</div>
		</Router>
	);
}

export default App;
