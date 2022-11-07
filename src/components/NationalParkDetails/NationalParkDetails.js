import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./NationalParkDetails";

function NationalParkDetails() {
  const { parkCode } = useParams();
  const url = "https://developer.nps.gov/api/v1";
  const [park, setPark] = useState([]);
  console.log(park);

  useEffect(() => {
    axios
      .get(
        `${url}/parks?parkCode=${parkCode}&api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setPark(res.data);
      });
  }, [parkCode]);

  return (
    <div className={styles.title}>
      <h1>{park.fullName}</h1>
    </div>
  );
}

export default NationalParkDetails;
