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
                          key={movie.id}
                          img={movie.img} 
                          name={movie.name}
                          synopsis={movie.synopsis}
                        />
              })
            }
          </ul>
        ) : <p className={styles.noMovies}> Nada aqui :/ </p>
      }
    </>
  );
}

export default MovieList;