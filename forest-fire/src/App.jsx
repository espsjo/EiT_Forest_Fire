import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WarningCircle from "./components/WarningCircle.tsx";

function App() {
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
      <header
        className="App-header"
        style={{ display: "flex", flexDirection: "row", width: "100%" }}
      >
        <p>Forest Fire Forecast</p>
        <img
          src={require("./logo.jpg")}
          className="App-logo"
          alt="fire"
          style={{ marginLeft: "15px" }}
        />
      </header>
      <div style={{ height: "100vh", width: "80%" }}>
        <MapContainer center={[63.446827, 10.421906]} zoom={13} radius={20}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <WarningCircle
            color={"yellow"}
            lat={"63.388519442261495"}
            long={"10.666932529755468"}
            radius={1000}
            popupText="Begynner å bli farlig"
          />
          <WarningCircle
            color={"red"}
            lat={"63.398519442261495"}
            long={"10.666932529758468"}
            radius={1000}
            popupText="Her brenner det når som helst."
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
