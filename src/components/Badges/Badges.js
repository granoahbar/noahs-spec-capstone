import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../store/authContext";
import styles from "./Badges.module.css";
import Badge from "../Badge/Badge";

export default function Badges() {
  const { userId, token } = useContext(AuthContext);
  const [badges, setBadges] = useState([]);

  console.log(badges);

  const getUserBadges = () => {
    const headers = {
      authorization: token,
    };
    axios
      .get(`http://localhost:4005/badges/${userId}`, { headers })
      .then((res) => setBadges(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserBadges();
  }, []);

  return (
    <div className={styles.badges_disp}>
      {!badges ? (
        <h3>loading your badges...</h3>
      ) : (
        <div className={styles.badges_disp}>
          <Badge badges={badges} />{" "}
        </div>
      )}
    </div>
  );
}
