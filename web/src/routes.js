import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomeAccountPage from './containers/HomeAccountPage';
import HomeProfilePage from './containers/HomeProfilePage';
import WatchlistPage from './containers/WatchlistPage';
import SearchResultsPage from './containers/SearchResultsPage';

function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>

            <Route path="/accountHome" component={HomeAccountPage} />
            <Route path="/profileHome" component={HomeProfilePage} />
            <Route path="/watchlist" component={WatchlistPage} />
            <Route path="/search/:text" component={SearchResultsPage} />
            
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </BrowserRouter>
    );
}

export default Routes;