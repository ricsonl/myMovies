import { Request, Response } from 'express';
import db from '../db/connection';

class ProfilesController {

  async index(req :Request, res :Response){// lista os perfis da conta
    const { logged_acc } = req.headers;

    const accountProfiles = await db('accounts')
      .join('account_profile', 'accounts.id', '=', 'account_profile.account_id')
      .where('accounts.id', logged_acc)
      .join('profiles', 'account_profile.profile_id', '=', 'profiles.id')
      .select('profile_id as id', 'name', 'main', 'birthday');
    
    return res.json(accountProfiles);
  }

  async show(req :Request, res :Response){// mostrar um perfil dado o id
    const { id } = req.params;

    const profiles = await db('profiles')
      .where('id', id)
      .select('id', 'name', 'main', 'birthday');
    
    const profile = profiles[0];

    return res.json(profile);
  }

  async create(req :Request, res :Response){// cria um usuário em uma conta

    const { logged_acc } = req.headers;
    
    const profiles = await db('accounts')
      .join('account_profile', 'accounts.id', '=', 'account_profile.account_id')
      .where('accounts.id', logged_acc)
      .count('* as countProfiles');

    const { countProfiles } = profiles[0];

    if(countProfiles >= 4)
      return res.json({ message: 'Limite máximo de perfis atingido' });
    if(countProfiles == 0)
      return res.json({ message: 'Conta inexistente' });

    const trx = await db.transaction();

    const { name } = req.body;
    if(name === '')
      return res.json({ message: 'Preencha todos os campos!' });

    const newProfile = {
      name,
      main: false,
    }

    const insertedProfileIds = await trx('profiles').insert(newProfile);

    const newProfileId = insertedProfileIds[0];

    await trx('account_profile').insert({
      account_id: logged_acc,
      profile_id: newProfileId,
    });

    trx.commit();

    return res.status(201).json({
      id: newProfileId,
      ...newProfile
    });

  }

  async delete(req :Request, res :Response){// remove um perfil da conta
    const { logged_acc } = req.headers;

    const accounts = await db('accounts')
      .where('accounts.id', logged_acc);

    if(accounts.length == 0)
      return res.json({ message: 'Conta inexistente' });

    const { targetId } = req.params;

    const owner = await db('account_profile')
      .where('profile_id', targetId)
      .where('account_id', logged_acc);

    if(owner.length == 0)
      return res.json({ message: 'Você não tem permissão para deletar este perfil' });

    const profiles = await db('profiles')
      .where('profiles.id', targetId)
      .select('main');

    if(profiles[0].main)
      return res.json({ message: 'Você não pode deletar o perfil principal da sua conta' });

    const trx = await db.transaction();

    await trx('account_profile')
      .where('profile_id', targetId)
      .delete();
    
    await trx('profiles')
      .where('id', targetId)
      .delete();

    trx.commit();

    return res.status(204).json({ deleted: targetId });
  }
}

export default ProfilesController;