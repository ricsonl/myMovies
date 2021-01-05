import React from 'react';

const UserContext = React.createContext({

  loggedAcc: null,
  loggedProf: null,
  profileName: '',

  setLoggedAcc: () => {},
  setLoggedProf: () => {},
  setProfileName: () => {}

});

export default UserContext;