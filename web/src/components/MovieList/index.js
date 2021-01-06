import React from 'react';

import MovieListItem from './MovieListItem';

import styles from './styles.module.css';

const MovieList = (props) => {
  return (
    <>
      {
        props.movies.length > 0 ? (
          <ul className={styles.list}>
            {
              props.movies.map(movie => {
                return <MovieListItem 
                          key={movie.tmdbId}
                          tmdbId={movie.tmdbId}
                          img={movie.imageUrl} 
                          name={movie.name}
                          synopsis={movie.synopsis}
                          isOnWatchlist={movie.isOnWatchlist}
                          add={props.add}
                        />
              })
            }
          </ul>
        ) : <p className={styles.noMovies}> Nada aqui :/ </p>
      }
    </>
  );
}

export default React.memo(MovieList);