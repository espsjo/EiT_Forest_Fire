import "./App.css";
import axios from "axios";

function App() {
  axios
    .get("https://localhost:7044/ReadingItems/")
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
  return (
    <div className="App">
      <header className="App-header">
        <img src={require("./logo.jpg")} className="App-logo" alt="fire" />
        <p>Forest Fire Forecast</p>
      </header>
    </div>
  );
}

export default App;
