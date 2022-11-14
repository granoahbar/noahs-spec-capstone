import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../store/authContext";

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

  return <div>badge</div>;
}
