import {BrowserRouter as Router, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Navbar from './components/layouts/navbar.component';

import Login from './components/layouts/user/login.component';

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

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/login" exact component={Login}/>

      <Route path="/movie" exact component={Movies}/>
      <Route path="/movie/create" component={CreateMovie}/>
      <Route path="/movie/edit/:id" component={EditMovie}/>

      <Route path="/actor" exact component={Actors}/>
      <Route path="/actor/create" component={CreateActor}/>
      <Route path="/actor/edit/:id" component={EditActor}/>

      <Route path="/genre" exact component={Genres}/>
      <Route path="/genre/create" component={CreateGenre}/>
      <Route path="/genre/edit/:id" component={EditGenre}/>
      
      <Route path="/producer" exact component={Producers}/>
      <Route path="/producer/create" component={CreateProducer}/>
      <Route path="/producer/edit/:id" component={EditProducer}/>

    </Router>
  );
}

export default App;
