import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomeAccountPage from './containers/HomeAccountPage';
import HomeProfilePage from './containers/HomeProfilePage';

function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/accountHome/:id" component={HomeAccountPage}/>
            <Route path="/profileHome/:id" component={HomeProfilePage}/>
        </BrowserRouter>
    );
}

export default Routes;