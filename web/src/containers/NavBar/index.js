import React, { Component } from 'react';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

import UserContext from '../../context/UserContext';

import styles from './styles.module.css';

class NavBar extends Component {

  static contextType = UserContext;

  render() {
    return (
      <div className={styles.navContainer}>
        <Logo onClick={this.props.goToHome}/>
        <form onSubmit={this.props.onSubmit}>
          <Input 
            type="text"
            placeholder="Buscar filmes" 
            value={this.props.searchText}
            onChange={this.props.onChange}
          />
          <button className={styles.searchButton} type="submit">Buscar</button>
        </form>

        <button onClick={this.props.goToWatchlist} className={styles.navItem}>
          Watchlist
        </button>

        <button onClick={this.props.onSwitchProfile} className={styles.navItem}>
          {this.context.profileName}
          <p>trocar perfil</p>
        </button>
      </div>
    );
  }
}

export default NavBar;