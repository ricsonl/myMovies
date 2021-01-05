import React, { Component } from 'react';

import ProfileItem from '../../components/ProfileItem';

import api from '../../services/api';

import styles from './styles.module.css';

class HomeAccountPage extends Component {

  state = {
    profiles: [],
  }

  async componentDidMount(){
    const response = await api.get('/profiles', {
      headers: { logged_acc: this.props.match.params.id }
    });
    this.setState({ profiles: response.data });
  }

  render() {
    return (
      <> 
        <h1 className={styles.title}>Selecione um perfil</h1>
        { this.state.profiles.length > 0 ? (
          <ul className={styles.profileList}>
            {
              this.state.profiles.map(profile => {
                return <ProfileItem key={profile.id} name={profile.name}/>
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