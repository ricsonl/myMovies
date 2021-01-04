import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db/connection';

class AccountsController {

  async index(req :Request, res :Response){// lista contas cadastradas

    const accounts = await db('accounts')
      .select('*');
    
    return res.status(200).json(accounts);

  }

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
        .count('* as countSame');
      
      const { countSame } = sameEmailAccounts[0];
      
      if(countSame > 0)
        return res.status(409).json({ message: 'Já existe uma conta com este email!' });

      const trx = await db.transaction();
    
      const hashed = await bcrypt.hash(password, 10);

      const account = {
        email,
        password: hashed,
      };
      const insertedAccountIds = await trx('accounts').insert(account);

      const mainProfile = {
        name: mainProfileName,
        main: true,
        birthday,
      }
      const insertedProfileIds = await trx('profiles').insert(mainProfile);

      const accountId = insertedAccountIds[0];
      const mainProfileId = insertedProfileIds[0];

      await trx('account_profile').insert({
        account_id: accountId,
        profile_id: mainProfileId,
      });

      trx.commit();

      return res.status(201).json({
        accountId,
        ...account
      });

    }
    return res.status(400).json({ message: 'Preencha todos os campos!' });
  }
}

export default AccountsController;