import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./NationalParkDetails.module.css";
import AuthContext from "../store/authContext";

function NationalParkDetails() {
  const { token, userId } = useContext(AuthContext);
  const { parkCode } = useParams();
  const url = "https://developer.nps.gov/api/v1";
  const [park, setPark] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [openWeather, setOpenWeather] = useState(false);

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

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenWeather = () => {
    setOpenWeather(!openWeather);
  };

  const parkName = park.data[0].fullName;
  const parkImgUrl = park.data[0].images[1].url;

  const handleCollectBadge = (e) => {
    // preventing default
    e.preventDefault();

    // sending data to data base with axios using the following end point
    axios
      .post(
        "/badges",
        // body obj of title content status and userId
        { parkCode, parkName, parkImgUrl, userId },
        // user had to be authorized
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Way to go! You have collected another badge!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.details_page}>
      {!park.data ? (
        <h3>loading...</h3>
      ) : (
        <>
          <img className={styles.banner_img} src={park.data[0].images[1].url} />
          <h2>{park.data[0].fullName}</h2>
          <section className={styles.badge_disp}>
            <img
              onClick={handleCollectBadge}
              className={styles.badge}
              src={park.data[0].images[1].url}
            />
            <p>Have you been here? Collect your badge!</p>
          </section>
          <button onClick={handleOpen}>Hours of Operation</button>
          {open ? (
            <section className={styles.hours_of_op}>
              <h3>Hours of Operation</h3>
              <p className={styles.hours_desc}>
                {park.data[0].operatingHours[0].description}
              </p>
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
                  <p>
                    {park.data[0].operatingHours[0].standardHours.wednesday}
                  </p>
                  <p>{park.data[0].operatingHours[0].standardHours.thursday}</p>
                  <p>{park.data[0].operatingHours[0].standardHours.friday}</p>
                  <p>{park.data[0].operatingHours[0].standardHours.saturday}</p>
                  <p>{park.data[0].operatingHours[0].standardHours.sunday}</p>
                </section>
              </section>
            </section>
          ) : (
            <div></div>
          )}
          <button onClick={handleOpenWeather}>What The Weather is Like</button>
          {openWeather ? (
            <section className={styles.hours_of_op}>
              <h3>Weather</h3>
              <p className={styles.hours_desc}>{park.data[0].weatherInfo}</p>
            </section>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
}

export default NationalParkDetails;
