import React, { useEffect, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Header from "./components/Header.tsx";
import MapCont from "./components/MapCont.tsx";
import axios from "axios";

function App() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("https://eitforestry20240221144150.azurewebsites.net/prediction")
        
        .then((res) => {
          console.log(res.data)
          setPredictions(res.data);
        })
        .catch((e) => console.log(e));
    }, 6000); // Fetch new data from backend every 60 seconds.

    return () => clearInterval(intervalId); // Cleanup function
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <div style={{ height: "100vh", width: "80%" }}>
        <MapCont
          mapLat={63.446827}
          mapLong={10.421906}
          zoom={11}
          circleData={predictions}
        />
      </div>
    </div>
  );
}

export default App;
