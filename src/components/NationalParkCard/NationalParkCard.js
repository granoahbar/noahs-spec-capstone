import styles from "./NationalParkCard.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function NpCard(props) {
  const { parks } = props;
  const navigate = useNavigate();

  return parks.map((park) => {
    const handleClick = () => {
      navigate(`/park/${park.parkCode}`);
    };

    return (
      <div
        className={styles.national_park_card}
        key={park.fullName}
        onClick={handleClick}
      >
        <p className={styles.park_name}>{park.fullName}</p>
      </div>
    );
  });
}
