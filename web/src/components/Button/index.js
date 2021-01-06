import React from 'react';

import styles from './styles.module.css';

const Button = (props) => {
  return (
    <button className={styles.myButton} {...props} >{props.title}</button>
  );
};

export default React.memo(Button);