import React from 'react';

import Button from '../../Button';

import styles from './styles.module.css';

const MovieListItem = (props) => {
  return (
    <li className={styles.card}>
      <img src={props.img} alt=""/>
      <Button 
          disabled={props.isOnWatchlist}
          onClick={props.add.bind(this, props.tmdbId)}
          title="Adicionar"
      />
      <footer>
        <h3>{props.name}</h3>
        <p>{props.synopsis}</p>
      </footer>
    </li>
  );
};

export default React.memo(MovieListItem);