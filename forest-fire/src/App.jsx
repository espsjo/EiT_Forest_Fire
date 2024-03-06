import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WarningCircle from "./components/WarningCircle.tsx";
// tid og temp div. vis utviling siste uka f.eks.
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
            popupImage="data:image/jpeg;base64,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" 
          />
          <WarningCircle
            color={"red"}
            lat={"63.398519442261495"}
            long={"10.666932529758468"}
            radius={1000}
            popupText="Her brenner det når som helst"
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
