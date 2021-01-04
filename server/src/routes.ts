import express from 'express';

import AccountsController from './controllers/AccountsController';
import ProfilesController from './controllers/ProfilesController';
import LoginController from './controllers/LoginController';
import WatchListController from './controllers/WatchListController';

const routes = express.Router();
const accountsController = new AccountsController();
const profilesController = new ProfilesController();
const loginController = new LoginController();
const watchListController = new WatchListController();

routes.get('/accounts', accountsController.index);
routes.post('/accounts', accountsController.create);

routes.get('/profiles', profilesController.index);
routes.post('/profiles', profilesController.create);
routes.delete('/profiles', profilesController.delete);

routes.post('/login', loginController.create);

routes.get('/watchlist', watchListController.index);
routes.post('/watchlist', watchListController.create);
routes.delete('/watchlist', watchListController.delete);

export default routes;