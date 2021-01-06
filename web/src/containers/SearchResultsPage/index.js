import React, { Component } from 'react';

import UserContext from '../../context/UserContext';
import { searchByText } from '../../services/tmdbHelpers';

import NavBar from '../NavBar';
import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class SearchResultsPage extends Component {

  static contextType = UserContext;

  state = {
    searchResults: [],
  }

  async componentDidMount(){

    const textSearched = this.props.match.params.text;
    const response = await searchByText(textSearched);
    this.setState({searchResults: response});

  }

  async componentDidUpdate(){

    const textSearched = this.props.match.params.text;
    const response = await searchByText(textSearched);
    this.setState({searchResults: response});

  }

  render() {
    return (
      <> 
        <NavBar />
        <h2 className={styles.title}>Resultados da busca</h2>
        <MovieList movies={this.state.searchResults} />
      </>
    )
  }
}

export default SearchResultsPage;