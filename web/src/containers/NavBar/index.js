import React, { Component } from 'react';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

import styles from './styles.module.css';

class NavBar extends Component {

  render() {
    return (
      <div className={styles.navContainer}>
        <Logo />
        <form onSubmit={this.props.onSubmit}>
          <Input 
            type="text"
            placeholder="Buscar filmes" 
            value={this.props.searchText}
            onChange={this.props.onChange}
          />
          <button className={styles.searchButton} type="submit">Buscar</button>
        </form>
        <button className={styles.navItem}>Watchlist</button>
        <button className={styles.navItem}>Trocar perfil</button>
      </div>
    );
  }
}

export default NavBar;