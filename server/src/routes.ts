import express from 'express';

import AccountsController from './controllers/AccountsController';

const routes = express.Router();
const accountsController = new AccountsController();

routes.get('/accounts', (req, res) => {
  return res.json(['hi']);
});

routes.post('/accounts', accountsController.create);

export default routes;