import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/authContext";
import styles from "./Auth.module.css";
// creating a variable called auth
const Auth = () => {
  // creating 3 peices of state for the username, password, and if the are registering
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  // asking about this tomrrow
  const authCtx = useContext(AuthContext);
  // creating a submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    // creating a bodyobj that will consist of a username and password
    const body = {
      username,
      password,
    };
    // creating a variable for url so it does not have to be re written over and over again
    const url = "http://localhost:4005";
    // axios request that is sending data to the data base, if they are registering the data is sent to the data base to be sacved, if not, the data base will be searched for their information that they entered, and then sen back the users id and assign them a token and expiration
    axios
      .post(register ? `${url}/register` : `${url}/login`, body)
      .then((res) => {
        console.log("AFTER AUTH", res.data);
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
      })
      .catch((err) => {
        setPassword("");
        setUsername("");
      });
  };

  return (
    <main className={styles.ls_form}>
      <p>
        Login or Sign up to view details about national parks, and collect
        badges for the parks that you have visited!
      </p>
      <form className={styles.auth_form} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.form_input}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.form_input}
        />
        <button className={styles.form_btn}>
          {register ? "Sign Up" : "Login"}
        </button>
        <button
          onClick={(e) => setRegister(!register)}
          className={styles.form_btn_ls}
        >
          Need to {register ? "Login" : "Sign Up"}?
        </button>
      </form>
    </main>
  );
};

export default Auth;
