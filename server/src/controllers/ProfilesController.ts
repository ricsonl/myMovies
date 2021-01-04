import { Request, Response } from 'express';
import db from '../db/connection';

class ProfilesController {

  async index(req :Request, res :Response){// lista os perfis da conta
    const { logged } = req.headers;

    const accountProfiles = await db('accounts')
      .join('account_profile', 'accounts.id', '=', 'account_profile.account_id')
      .where('accounts.id', logged)
      .join('profiles', 'account_profile.profile_id', '=', 'profiles.id')
      .select('profile_id', 'name');
    
    res.json(accountProfiles);
  }

  async create(req :Request, res :Response){// cria um usuário em uma conta

    const { logged } = req.headers;
    
    const profiles = await db('accounts')
      .join('account_profile', 'accounts.id', '=', 'account_profile.account_id')
      .where('accounts.id', logged)
      .count('* as countProfiles');

    const { countProfiles } = profiles[0];

    if(countProfiles >= 4)
      return res.json({ message: 'Limite máximo de perfis atingido' });

    const trx = await db.transaction();

    const { name } = req.body;
    const newProfile = {
      name: name,
    }

    const insertedProfileIds = await trx('profiles').insert(newProfile);

    const newProfileId = insertedProfileIds[0];

    await trx('account_profile').insert({
      account_id: logged,
      profile_id: newProfileId,
    });

    trx.commit();

    return res.json(newProfile);

  }
}

export default ProfilesController;