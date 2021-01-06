import React, { PureComponent } from 'react';

import ProfileItem from '../../components/ProfileItem';

import UserContext from '../../context/UserContext';
import api from '../../services/api';

import styles from './styles.module.css';

class HomeAccountPage extends PureComponent {

  static contextType = UserContext;

  state = {
    profiles: [],
  }

  async componentDidMount(){
    
    this.context.setLoggedProf(null);
    this.context.setProfileName('');

    const loggedAcc = this.context.loggedAcc;

    const response = await api.get('/profiles', {
      headers: { logged_acc: loggedAcc }
    });

    this.setState({
      profiles: response.data
    });
  }

  onProfileClick = (id, name) => {
    this.context.setLoggedProf(id);
    this.context.setProfileName(name);
    this.props.history.push(`/profileHome`);
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
                          clicked={this.onProfileClick.bind(this, profile.id, profile.name)}
                        />
              })
            }
          </ul>
        ) : (
          null
        ) }
      </>
    )
  }
}

export default HomeAccountPage;