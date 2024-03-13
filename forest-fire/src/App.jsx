import "./App.css";
import "leaflet/dist/leaflet.css";
import Header from "./components/Header.tsx";
import MapCont from "./components/MapCont.tsx";
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
      <Header />
      <div style={{ height: "100vh", width: "80%" }}>
        <MapCont mapLat={63.446827} mapLong={10.421906} zoom={11} radius={20}/>
      </div>
    </div>
  );
}

export default App;
