import React, { useState, useEffect } from 'react';

import { searchById } from '../../../services/tmdbHelpers';

import Button from '../../Button';
import styles from './styles.module.css';

const WatchlistItem = (props) => {
  const [movie, setMovie] = useState({});

  useEffect(async () => {
    const mv = await searchById(props.tmdbId);
    setMovie(mv);
  }, [])

  return (
    <li className={styles.card}>
      <img src={movie.imageUrl} alt=""/>
      <Button onClick={props.remove.bind(this, props.id)} title="Remover"/>
      <footer>
        <h3>{movie.name}</h3>
        <p>{movie.synopsis}</p>
      </footer>
    </li>
  );
};

export default WatchlistItem;