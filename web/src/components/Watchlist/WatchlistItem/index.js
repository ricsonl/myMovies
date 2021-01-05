import React from 'react';

import Button from '../../Button';

import styles from './styles.module.css';

const WatchlistItem = (props) => {
  console.log(props)
  return (
    <li className={styles.card}>
      <div>
        <h3>{props.name}</h3>
        <p>{props.synopsis}</p>
      </div>
      <Button onClick={props.remove.bind(this, props.id)} title="Remover"/>
    </li>
  );
};

export default WatchlistItem;