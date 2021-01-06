import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

import UserContext from '../../context/UserContext';

import styles from './styles.module.css';

class NavBar extends Component {

  static contextType = UserContext;

  state = {
    searchText: '',
  }

  onSwitchProfile = () => {
    this.context.setLoggedProf(null);
    this.context.setProfileName('');

    this.props.history.push(`/accountHome`);
  }

  render() {
    return (

      <div className={styles.navContainer}>

        <NavLink to={`/profileHome`} className={styles.logo}>
          <Logo/>
        </NavLink>

        <div>
          <Input 
            type="text"
            placeholder="Buscar filmes" 
            value={this.state.searchText}
            onChange={e => this.setState({searchText: e.target.value})}
          />
          <NavLink to={this.state.searchText === '' ? '#' : `/search/${this.state.searchText}`} 
            className={styles.searchButton}
          >
            Buscar
          </NavLink>
        </div>

        <NavLink to={`/watchlist`} className={styles.navItem}>
          Watchlist
        </NavLink>

        <NavLink to={`/accountHome`} className={styles.navItem}>
          {this.context.profileName}
          <p>trocar perfil</p>
        </NavLink>

      </div>
      
    );
  }
}

export default NavBar;