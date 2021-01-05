import React, { Component } from 'react';

import UserContext from '../../context/UserContext';
import api from '../../services/api';

import NavBar from '../NavBar';
import Watchlist from '../../components/Watchlist';
import styles from './styles.module.css';

class WatchlistPage extends Component {

  static contextType = UserContext;

  state = {
    searchText: '',
    watchlist: [],
  }

  async componentDidMount(){

    const loggedProf = this.context.loggedProf;
    const response = await api.get('/watchlist', {
      headers: { logged_prof: loggedProf }
    });
    this.setState({ 
      watchlist: response.data
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

  removeWatchlistItem = async (id) => {
    const loggedProf = this.context.loggedProf;

    await api.delete(`/watchlist/${id}`, {
      headers: { logged_prof: loggedProf }
    });

    const response = await api.get('/watchlist', {
      headers: { logged_prof: loggedProf }
    });
    
    this.setState({ 
      watchlist: response.data
    });
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
        <h2 className={styles.title}>Watchlist</h2>
        <Watchlist movies={this.state.watchlist} remove={this.removeWatchlistItem}/>
      </>
    )
  }
}

export default WatchlistPage;