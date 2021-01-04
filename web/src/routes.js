import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomeAccountPage from './containers/HomeAccountPage';
import HomeProfilePage from './containers/HomeProfilePage';

import PrivateRoute from './Utils/PrivateRoute';

function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>
            <PrivateRoute path="/accountHome/:id" component={HomeAccountPage}/>
            <PrivateRoute path="/profileHome/:id" component={HomeProfilePage}/>
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </BrowserRouter>
    );
}

export default Routes;