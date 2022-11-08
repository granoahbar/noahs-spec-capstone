import React from "react";
import styles from "./NationalParkDetails.module.css";

const DetailImage = ({ image, title }) => {
  const backgroundString = `--background: url(${image})`;
  return (
    <div
      // className={moreStyles.ad_banner}
      className={styles.banner}
      style={{
        background: `linear-gradient(175deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
      }}
      // style={{backgroundString}}
    >
      <div className={styles.ad_text}>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default DetailImage;
