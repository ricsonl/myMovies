import React from 'react';

const UserContext = React.createContext({

  loggedAcc: null,
  loggedProf: null,
  profileName: '',
  watchlist: [],

  setLoggedAcc: () => {},
  setLoggedProf: () => {},
  setProfileName: () => {},
  setWatchlist: () => {},

});

export default UserContext;