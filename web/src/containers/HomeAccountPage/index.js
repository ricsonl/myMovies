import React, { Component } from 'react';

import ProfileItem from '../../components/ProfileItem';

import api from '../../services/api';

import styles from './styles.module.css';

class HomeAccountPage extends Component {

  state = {
    loggedAccount: null,
    profiles: [],
  }

  async componentDidMount(){

    const loggedAcc = this.props.match.params.id;

    const response = await api.get('/profiles', {
      headers: { logged_acc: loggedAcc }
    });

    this.setState({
      loggedAccount: loggedAcc, 
      profiles: response.data
    });

  }

  onProfileClick = (id) => {
    this.props.history.push(`/profileHome/${id}`);
  }

  render() {
    return (
      <> 
        <h1 className={styles.title}>Selecione um perfil</h1>
        { this.state.profiles.length > 0 ? (
          <ul className={styles.profileList}>
            {
              this.state.profiles.map(profile => {
                return <ProfileItem
                          key={profile.id}
                          name={profile.name}
                          clicked={this.onProfileClick.bind(this, profile.id)}
                        />
              })
            }
          </ul>
        ) : (
          <p>b</p>
        ) }
      </>
    )
  }
}

export default HomeAccountPage;