import React from 'react';

import Button from '../../Button';

import styles from './styles.module.css';

const MovieListItem = (props) => {
  return (
    <li className={styles.card}>
      <img src={props.img} alt=""/>
      <Button title="Adicionar"/>
      <footer>
        <strong>{props.name}</strong>
        <p>{props.synopsis}</p>
      </footer>
    </li>
  );
};

export default MovieListItem;