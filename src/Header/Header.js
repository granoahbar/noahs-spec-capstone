import { NavLink } from "react-router-dom";
import { useContext } from "react";
import styles from "./Header.module.css";
import AuthContext from "../store/authContext";

// creating a component called header
const Header = () => {
  const authCtx = useContext(AuthContext);
  // function for adding style to a nav link if it is active
  // const styleActiveLink = ({ isActive }) => {
  //   return {
  //     // if the link is active, then set the color to what is outlined below
  //     color: isActive ? "#f57145" : "#FFFFFF",
  //   };
  // };
  // returnin the JSX with everything that is making up the header and adding the active link style functionality to the links
  return (
    <nav className={styles.nav_bar}>
      <h1 className={styles.logo}>My National Parks</h1>
      {authCtx.token ? (
        <ul className={styles.nav_buttons}>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="badges">
              My Badges
            </NavLink>
          </li>
          <li>
            <li className="logout-btn" onClick={() => authCtx.logout()}>
              <NavLink style={{ textDecoration: "none" }} to="/">
                Logout
              </NavLink>
            </li>
          </li>
        </ul>
      ) : (
        <ul className={styles.nav_buttons}>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/auth">
              Login or Sign Up
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
