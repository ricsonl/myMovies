import React from 'react';

import WatchlistItem from './WatchlistItem';

import styles from './styles.module.css';

const Watchlist = (props) => {
  return (
    <>
      {
        props.movies.length > 0 ? (
          <ul className={styles.list}>
            {
              props.movies.map(movie => {
                return <WatchlistItem
                          key={movie.id}
                          id={movie.id}
                          tmdbId={movie.TMDB_id}
                          remove={props.remove}
                        />
              })
            }
          </ul>
        ) : <p className={styles.noMovies}> Nada aqui :/ </p>
      }
    </>
  );
}

export default Watchlist;