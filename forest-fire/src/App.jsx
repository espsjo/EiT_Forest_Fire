import "./App.css";
import axios from "axios";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
function App() {
  axios
    .get("https://localhost:7044/ReadingItems/")
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
  return (
    <div className="App" style={{display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center"}}>
      <header className="App-header" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <p>Forest Fire Forecast</p>
        <img src={require("./logo.jpg")} className="App-logo" alt="fire" style={{marginLeft: "15px"}}/>
      </header>
      <div style={{height: "100vh", width: "80%"}}>
        <MapContainer center={[63.446827, 10.421906]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
