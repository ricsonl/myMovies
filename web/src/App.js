import React, { Component } from 'react';
import Routes from './routes.js';
import './App.css';

import UserContext from './context/UserContext';

class App extends Component {

  state = {
    loggedAcc: null,
    loggedProf: null,
    profileName: '',
    profiles: [],
  }

  setLoggedAcc = (id) => {
    this.setState({loggedAcc: id});
  }
  setLoggedProf = (id) => {
    this.setState({loggedProf: id});
  }
  setProfileName = (name) => {
    this.setState({profileName: name});
  }

  render(){
    return (
      <UserContext.Provider value={{
        loggedAcc: this.state.loggedAcc,
        loggedProf: this.state.loggedProf,
        profileName: this.state.profileName,
        setLoggedAcc: this.setLoggedAcc,
        setLoggedProf: this.setLoggedProf,
        setProfileName: this.setProfileName,
      }}>
        <Routes />
      </UserContext.Provider>
    );
  }
}

export default App;
