import { Request, Response } from 'express';
import db from '../db/connection';

class WatchListController {

  async index(req :Request, res :Response){// lista os filmes da watchlist
    const { logged_prof } = req.headers;

    const profiles = await db('profiles')
      .where('profiles.id', logged_prof);
    
    if(profiles.length == 0)
      return res.status(401).json({ message: 'Perfil inexistente' });
    
    const profileWatchlist = await db('profiles')
      .join('profile_watchlistItem', 'profiles.id', '=', 'profile_watchlistItem.profile_id')
      .where('profiles.id', logged_prof)
      .join('watchlistItems', 'profile_watchlistItem.watchlistItem_id', '=', 'watchlistItems.id')
      .select('watchlistItems.id', 'TMDB_id', 'watchlistItems.name', 'synopsis', 'watched');
    
    return res.status(200).json(profileWatchlist);
    
  }

  async create(req :Request, res :Response){// adiciona um filme à watchlist

    const { logged_prof } = req.headers;

    const profiles = await db('profiles')
      .where('profiles.id', logged_prof);

    if(profiles.length == 0)
      return res.status(401).json({ message: 'Perfil inexistente' });

    const { TMDB_id, name, synopsis } = req.body;

    const countSameMovies = await db('profiles')
      .join('profile_watchlistItem', 'profiles.id', '=', 'profile_watchlistItem.profile_id')
      .where('profiles.id', logged_prof)
      .join('watchlistItems', 'profile_watchlistItem.watchlistItem_id', '=', 'watchlistItems.id')
      .where('TMDB_id', TMDB_id)
      .count('* as countSame');
      
    const { countSame } = countSameMovies[0];

    if(countSame > 0)
        return res.status(409).json({ message: 'Este filme já está na sua watchlist!' });

    const trx = await db.transaction();

    const newWatchlistItem = {
      TMDB_id,
      name,
      synopsis,
      watched: false,
    }

    const insertedWatchlistItemIds = await trx('watchlistItems').insert(newWatchlistItem);

    const newWatchlistItemId = insertedWatchlistItemIds[0];

    await trx('profile_watchlistItem').insert({
      profile_id: logged_prof,
      watchlistItem_id: newWatchlistItemId,
    });

    trx.commit();

    return res.status(201).json({
      id: newWatchlistItemId,
      ...newWatchlistItem
    });

  }

  async delete(req :Request, res :Response){// remove um filme da watchlist
    const { logged_prof } = req.headers;

    const profiles = await db('profiles')
      .where('profiles.id', logged_prof);

    if(profiles.length == 0)
      return res.status(401).json({ message: 'Perfil inexistente' });

    const { watchlistItem_id } = req.body;

    const owner = await db('profile_watchlistItem')
      .where('watchlistItem_id', watchlistItem_id)
      .where('profile_id', logged_prof);

    if(owner.length == 0)
      return res.status(401).json({ message: 'Você não tem permissão para deletar este item' });

    const trx = await db.transaction();

    await trx('profile_watchlistItem')
      .where('watchlistItem_id', watchlistItem_id)
      .delete();
    
    await trx('watchlistItems')
      .where('id', watchlistItem_id)
      .delete();

    trx.commit();

    return res.status(204).json({ deleted: watchlistItem_id });
  }
  
}

export default WatchListController;