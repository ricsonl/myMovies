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
    this.context.setWatchlist([]);

    const loggedAcc = this.context.loggedAcc;

    const response = await api.get('/profiles', {
      headers: { logged_acc: loggedAcc }
    });

    this.setState({
      profiles: response.data
    });
  }

  onProfileClick = async (id, name) => {
    this.context.setLoggedProf(id);
    this.context.setProfileName(name);

    const response = await api.get('/watchlist', {
      headers: { logged_prof: id }
    });

    this.context.setWatchlist(response.data);

    this.props.history.push(`/profileHome`);
  }

  onAddProfileClick = () => {
    this.props.history.push(`/createProfile`);
  }

  render() {
    return (
      <> 
        <h1 className={styles.title}>Selecione um perfil</h1>
        <ul className={styles.profileList}>
          {
            this.state.profiles.map(profile => {
              return <ProfileItem
                        key={profile.id}
                        name={profile.name}
                        clicked={this.onProfileClick.bind(this, profile.id, profile.name)}
                      />
            })
          }{
            this.state.profiles.length < 4 ? (
              <ProfileItem  plusPlaceHolder
                            clicked={this.onAddProfileClick.bind(this)}
              />
            ) : (
              null
            )
          }
        </ul>
      </>
    )
  }
}

export default HomeAccountPage;