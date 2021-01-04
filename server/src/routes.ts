import express from 'express';

import AccountsController from './controllers/AccountsController';
import ProfilesController from './controllers/ProfilesController';
import LoginController from './controllers/LoginController';

const routes = express.Router();
const accountsController = new AccountsController();
const profilesController = new ProfilesController();
const loginController = new LoginController();

routes.get('/accounts', accountsController.index);
routes.post('/accounts', accountsController.create);

routes.get('/profiles', profilesController.index);
routes.post('/profiles', profilesController.create);

routes.post('/login', loginController.create);

export default routes;