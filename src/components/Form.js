import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";

const Form = () => {
  // dont quite understand this but I am going to ask tomrrow
  const { token, userId } = useContext(AuthContext);
  // setting the variable of navigate to the function useNavigate that we imported from router dom
  const navigate = useNavigate();
  // setting 3 peices of state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(true);
  // creating a handle submit function that will be put on a button
  const handleSubmit = (e) => {
    // preventing default
    e.preventDefault();
    // sending data to data base with axios using the following end point
    axios
      .post(
        "/posts",
        // body obj of title content status and userId
        { title, content, status, userId },
        // user had to be authorized
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };
  // jsx that is returning the form for all the data that needs to be filled out
  return (
    <main>
      <form className="form add-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          // setting the value of the state to what is inside the input form
          onChange={(e) => setTitle(e.target.value)}
          className="form-input add-post-input"
        />
        <textarea
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-input add-post-input textarea"
        />
        <div className="flex-row status-container">
          <div className="radio-btn">
            <label htmlFor="private-status">private:</label>
            <input
              type="radio"
              name="status"
              id="private-status"
              value={true}
              onChange={(e) => setStatus(e.target.value)}
              checked={true}
            />
          </div>
          <div className="radio-btn">
            <label htmlFor="public-status">public:</label>
            <input
              type="radio"
              name="status"
              id="public-status"
              value={false}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>
        <button className="form-btn">submit</button>
      </form>
    </main>
  );
};

export default Form;
