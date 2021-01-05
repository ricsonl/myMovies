import React, { Component } from 'react';

import UserContext from '../../context/UserContext';
import api from '../../services/api';
import { searchByGenre } from '../../services/tmdbHelpers';

import NavBar from '../NavBar';
import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class HomeProfilePage extends Component {

  static contextType = UserContext;

  state = {
    searchText: '',
    suggestedMovies: [],
  }

  async componentDidMount(){

    const loggedProf = this.context.loggedProf;
    const genres = [];
    const response = await searchByGenre(genres);
    /*this.setState({ 
      suggestedMovies: response.data
    });*/

  }

  async componentDidUpdate(){
    const loggedProf = this.context.loggedProf;

    const response = await api.get('/watchlist', {
      headers: { logged_prof: loggedProf }
    });

    this.setState({ 
      suggestedMovies: response.data
    });
  }

  onSearch = () => {
    this.props.history.push(`/search/${this.state.searchText}`)
  }

  onSwitchProfile = () => {
    this.context.setLoggedProf(null);
    this.context.setProfileName('');

    this.props.history.push(`/accountHome`);
  }

  goToWatchlist = () => {
    this.props.history.push(`/watchlist`);
  }

  goToHome = () => {
    this.props.history.push(`/profileHome`);
  }

  render() {
    return (
      <> 
        <NavBar 
            searchText={this.state.searchText}
            onChange={e => this.setState({searchText: e.target.value})}
            onSubmit={this.onSearch}
            onSwitchProfile={this.onSwitchProfile}
            goToWatchlist={this.goToWatchlist}
            goToHome={this.goToHome}
        />
        <h2 className={styles.title}>Aqui estão alguns filmes que você pode gostar:</h2>
        <MovieList movies={this.state.suggestedMovies}/>
      </>
    )
  }
}

export default HomeProfilePage;