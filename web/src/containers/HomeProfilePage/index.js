import React, { Component } from 'react';


import UserContext from '../../context/UserContext';
import api from '../../services/api';

import NavBar from '../NavBar';
import styles from './styles.module.css';

class HomeProfilePage extends Component {

  static contextType = UserContext;

  state = {
    searchText: '',
    suggestedMovies: [],
  }

  async componentDidMount(){

    const loggedProf = this.props.match.params.id;

    const response = await api.get('/watchlist', {
      headers: { logged_prof: loggedProf }
    });

    this.setState({ 
      suggestedMovies: response.data
    });

  }

  onSearch = () => {
    const loggedProf = this.props.match.params.id;
    this.props.history.push(`/search/${loggedProf}/${this.state.searchText}`)
  }

  onSwitchProfile = () => {
    
  }

  render() {
    return (
      <> 
        <NavBar 
            searchText={this.state.searchText}
            onChange={e => this.setState({searchText: e.target.value})}
            onSubmit={this.onSearch}
            onSwitchProfile={this.onSwitchProfile}
        />
        { this.state.suggestedMovies.length > 0 ? (
          <>
            <h1 className={styles.title}>Aqui estão alguns filmes que você pode gostar</h1>
            <ul className={styles.suggestedList}>
              {
                this.state.suggestedMovies.map(profile => {
                  return <div>hi</div>
                })
              }
            </ul>
          </>
        ) : (
          <p>nada aqui</p>
        ) }
      </>
    )
  }
}

export default HomeProfilePage;