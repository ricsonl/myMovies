import React, { PureComponent } from 'react';

import UserContext from '../../context/UserContext';
import api from '../../services/api';

import NavBar from '../NavBar';
import Watchlist from '../../components/Watchlist';
import styles from './styles.module.css';

class WatchlistPage extends PureComponent {

  static contextType = UserContext;

  state = {
    searchText: '',
  }

  async componentDidMount(){

    const loggedProf = this.context.loggedProf;
    const response = await api.get('/watchlist', {
      headers: { logged_prof: loggedProf }
    });

    this.context.setWatchlist(response.data);
    
  }

  removeWatchlistItem = async (id) => {
    const loggedProf = this.context.loggedProf;

    await api.delete(`/watchlist/${id}`, {
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
        <h2 className={styles.title}>Watchlist</h2>
        <Watchlist movies={this.context.watchlist} remove={this.removeWatchlistItem} />
      </>
    )
  }
}

export default WatchlistPage;