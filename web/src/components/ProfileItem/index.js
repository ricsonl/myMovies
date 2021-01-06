import React from 'react';

import styles from './styles.module.css';

const ProfileItem = (props) => {
  return (
    <li className={styles.profileItem} onClick={props.clicked}>
      {
        props.plusPlaceHolder ? (
          <>
            <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiSkeiYMnrgbBRdBHe9QJk_kmrhfDWiKFJdA&usqp=CAU`} alt="" />
          </>
        ) : (
          <>
            <img src={`https://avatarfiles.alphacoders.com/865/86518.png`} alt="" />
            <strong>{props.name}</strong>
          </>
        )
      }
    </li>
  );
};

export default ProfileItem;