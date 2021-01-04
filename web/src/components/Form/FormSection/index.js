import React from 'react';

import styles from './styles.module.css';

const FormSection = (props) => {
  return (
    <>
      <h4 className={styles.title}>{props.title}</h4>
      {props.children}
    </>
  );
};

export default FormSection;