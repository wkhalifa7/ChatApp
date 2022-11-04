import React from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";

const Home = ({ handleEnterUsername }) => {
  const history = useHistory();
  const [name, setName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Please enter your username..."
        value={name}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <button
        onClick={() => {
          handleEnterUsername(name);
          history.push("/room");
        }}
        disabled={name === ""}
        className="enter-room-button"
      >
        Enter
      </button>
    </div>
  );
};

export default Home;
