import React from 'react';

import styles from './styles.module.css';

const Form = (props) => {
  return (
    <form className = {styles.myForm} {...props}>
      {props.title}
      {props.children}
    </form>
  );
};

export default Form;