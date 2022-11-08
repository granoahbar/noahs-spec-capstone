import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailImage from "./DetailImage";
import styles from "./NationalParkDetails.module.css";

function NationalParkDetails() {
  const { parkCode } = useParams();
  const url = "https://developer.nps.gov/api/v1";
  const [park, setPark] = useState([{}]);
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
    <div className={styles.details_page}>
      {!park.data ? (
        <h3>loading...</h3>
      ) : (
        <>
          <DetailImage
            image={park.data[0].images[1].url}
            title={park.data[0].fullName}
          />
          <section className={styles.hours_of_op}>
            <h3>Hours of Operation</h3>
            <p className={styles.hours_desc}>{park.data[0].operatingHours[0].description}</p>
            <section className={styles.days_times}>
              <section className={styles.days}>
                <p>Monday </p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
                <p>Saturday</p>
                <p>Sunday</p>
              </section>
              <section className={styles.times}>
                <p>{park.data[0].operatingHours[0].standardHours.monday}</p>
                <p>{park.data[0].operatingHours[0].standardHours.tuesday}</p>
                <p>{park.data[0].operatingHours[0].standardHours.wednesday}</p>
                <p>{park.data[0].operatingHours[0].standardHours.thursday}</p>
                <p>{park.data[0].operatingHours[0].standardHours.friday}</p>
                <p>{park.data[0].operatingHours[0].standardHours.saturday}</p>
                <p>{park.data[0].operatingHours[0].standardHours.sunday}</p>
              </section>
            </section>
          </section>
        </>
      )}
    </div>
  );
}

export default NationalParkDetails;
