import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db/connection';

class AccountsController {

  async create(req :Request, res :Response){// cria um registro na tabela de contas

    const {
      email,
      password,
      mainProfileName,
      birthday,
    } = req.body;

    if(email && password && mainProfileName && birthday){

      const sameEmailAccounts = await db('accounts')
        .where('email', email)
        .select('*');
      
      if(sameEmailAccounts.length > 0)
        return res.json({message: 'Já existe uma conta com este email!'});

      const trx = await db.transaction();
    
      const salt = await bcrypt.genSalt(6);
      const hashed = await bcrypt.hash(password, salt);

      const account = {
        email,
        password: hashed,
        birthday
      };
      const insertedAccountIds = await trx('accounts').insert(account);

      const mainProfile = {
        name: mainProfileName,
      }
      const insertedProfileIds = await trx('profiles').insert(mainProfile);

      const accountId = insertedAccountIds[0];
      const mainProfileId = insertedProfileIds[0];

      await trx('account_profile').insert({
        account_id: accountId,
        profile_id: mainProfileId,
      });

      trx.commit();

      return res.json({
        accountId,
        ...account
      });

    } return res.json({message: 'Preencha todos os campos!'});
  }

  async index(req :Request, res: Response){

  }
}

export default AccountsController;