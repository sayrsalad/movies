import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import PrivateRoute from './components/routing/PrivateRoute';

import Navbar from './components/layouts/navbar.component';

import Home from './components/layouts/home.component';

import Login from './components/layouts/user/login.component';
import Register from './components/layouts/user/register.component';

import Movies from './components/layouts/movie/movies.component';
import CreateMovie from './components/layouts/movie/create.movie.component';
import EditMovie from './components/layouts/movie/edit.movie.component';

import Actors from './components/layouts/actor/actors.component';
import CreateActor from './components/layouts/actor/create.actor.component';
import EditActor from './components/layouts/actor/edit.actor.component';

import Genres from './components/layouts/genre/genres.component';
import CreateGenre from './components/layouts/genre/create.genre.component';
import EditGenre from './components/layouts/genre/edit.genre.component';

import Producers from './components/layouts/producer/producers.component';
import CreateProducer from './components/layouts/producer/create.producer.component';
import EditProducer from './components/layouts/producer/edit.producer.component';

library.add(fas);

const App = () => {
	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />

					<Navbar />
				</Switch>

				<div className="home-section">

					<br />
					<PrivateRoute path="/" exact component={Home} />

					<PrivateRoute path="/movie" exact component={Movies} />
					<PrivateRoute path="/movie/create" component={CreateMovie} />
					<PrivateRoute path="/movie/edit/:id" component={EditMovie} />

					<PrivateRoute path="/actor" exact component={Actors} />
					<PrivateRoute path="/actor/create" component={CreateActor} />
					<PrivateRoute path="/actor/edit/:id" component={EditActor} />

					<PrivateRoute path="/genre" exact component={Genres} />
					<PrivateRoute path="/genre/create" component={CreateGenre} />
					<PrivateRoute path="/genre/edit/:id" component={EditGenre} />

					<PrivateRoute path="/producer" exact component={Producers} />
					<PrivateRoute path="/producer/create" component={CreateProducer} />
					<PrivateRoute path="/producer/edit/:id" component={EditProducer} />
				</div>


			</div>

		</Router>
	);
}

export default App;
