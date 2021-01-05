import React from 'react';

import styles from './styles.module.css'

const Logo = (props) => {
  return (
    <h1 onClick={props.onClick} className={styles.logo}>MyMovies</h1>
  );
};

export default Logo;