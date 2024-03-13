import "../App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WarningCircle from "../components/WarningCircle.tsx";
import React from "react";
import MapContProps from "../interfaces/MapContProps.ts";

const MapCont = (props: MapContProps) => {
  const getCircleColor = (dangerLevel) => {
    if (dangerLevel >= 0.8) {
      return "red";
    } else if (dangerLevel >= 0.5) {
      return "yellow";
    } else {
      return "green";
    }
  };

  const getPopupText = (dangerLevel) => {
    if (dangerLevel >= 0.8) {
      return "Her brenner det når som helst";
    } else if (dangerLevel >= 0.5) {
      return "Begynner å bli farlig";
    } else {
      return "Ikke farlig per nå";
    }
  };

  return (
    <MapContainer center={[props.mapLat, props.mapLong]} zoom={props.zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.circleData.map((prediction, index) => (
        <WarningCircle
          key={index}
          color={getCircleColor(prediction.dangerLevel)}
          latitude={prediction.latitude}
          longitude={prediction.longitude}
          radius={10000}
          popupText={getPopupText(prediction.dangerLevel)}
        />
      ))}
    </MapContainer>
  );
};

export default MapCont;
