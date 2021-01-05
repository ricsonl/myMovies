import React from 'react';

import styles from './styles.module.css';

const ProfileItem = (props) => {
  return (
    <li className={styles.profileItem}>
      <img src={`https://avatarfiles.alphacoders.com/865/86518.png`} alt="" />
      <strong>{props.name}</strong>
    </li>
  );
};

export default ProfileItem;