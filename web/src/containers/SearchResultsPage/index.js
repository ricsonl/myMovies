import React, { PureComponent } from 'react';

import UserContext from '../../context/UserContext';
import api from '../../services/api';
import { searchByText } from '../../services/tmdbHelpers';

import NavBar from '../NavBar';
import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class SearchResultsPage extends PureComponent {

  static contextType = UserContext;

  state = {
    searchResults: [],
  }

  async componentDidMount(){

    const textSearched = this.props.match.params.text;
    const response = await searchByText(textSearched);

    const watchlistIds = this.context.watchlist.map(movie => {
      return movie.TMDB_id;
    })

    const modifiedMovies = response.map( movie => {
      return {
        isOnWatchlist: watchlistIds.includes(movie.tmdbId),
        ...movie
      }
    });

    this.setState({searchResults: modifiedMovies});
  }

  async componentDidUpdate(){

    const textSearched = this.props.match.params.text;
    const response = await searchByText(textSearched);

    const watchlistIds = this.context.watchlist.map(movie => {
      return movie.TMDB_id;
    })

    const modifiedMovies = response.map( movie => {
      return {
        isOnWatchlist: watchlistIds.includes(movie.tmdbId),
        ...movie
      }
    });

    this.setState({searchResults: modifiedMovies});
  }

  addToWatchlist = async (id) => {
    const loggedProf = this.context.loggedProf;

    await api.post(`/watchlist/${id}`, null, {
      headers: { logged_prof: loggedProf }
    });

    const response = await api.get('/watchlist', {
      headers: { logged_prof: loggedProf }
    });
    
    this.context.setWatchlist(response.data);
  }

  render() {
    return (
      <> 
        <NavBar history={this.props.history}/>
        <h2 className={styles.title}>Resultados da busca</h2>
        <MovieList movies={this.state.searchResults} add={this.addToWatchlist} />
      </>
    )
  }
}

export default SearchResultsPage;