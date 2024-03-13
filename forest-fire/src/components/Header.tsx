import "../App.css";
import React from "react";
import logo from "../logo.jpg";

const Header = () => {
  return (
    <header
      className="App-header"
      style={{ display: "flex", flexDirection: "row", width: "100%" }}
    >
      <p>Forest Fire Forecast</p>
      <img
        src={logo}
        className="App-logo"
        alt="fire"
        style={{ marginLeft: "15px" }}
      />
    </header>
  );
};

export default Header;
