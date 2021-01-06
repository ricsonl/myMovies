import React, { PureComponent } from 'react';

import UserContext from '../../context/UserContext';
import api from '../../services/api';
import { searchByGenre } from '../../services/tmdbHelpers';

import NavBar from '../NavBar';
import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class HomeProfilePage extends PureComponent {

  static contextType = UserContext;

  state = {
    searchText: '',
    suggestedMovies: [],
  }

  async componentDidMount(){

    /*const loggedProf = this.context.loggedProf;
    const genres = [];
    const response = await searchByGenre(genres);
    this.setState({ 
      suggestedMovies: response.data
    });*/

  }

  

  render() {
    return (
      <> 
        <NavBar history={this.props.history}/>
        <h2 className={styles.title}>Aqui estão alguns filmes que você pode gostar</h2>
        <MovieList movies={this.state.suggestedMovies} />
      </>
    )
  }
}

export default HomeProfilePage;