import React from "react";
import styles from "./Badge.module.css";

function Badge(props) {
  const { badges } = props;

  return badges.map((badge) => {
    return (
      <div className={styles.badge}>
        <img className={styles.badge_img} src={badge.parkImgUrl} />
        <h3 className={styles.park_name}>{badge.parkName}</h3>
      </div>
    );
  });
}

export default Badge;
