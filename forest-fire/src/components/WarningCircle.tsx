import "../App.css";
import { Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";

interface WarningCircleProps {
  color: string;
  lat: number;
  long: number;
  radius: number;
}
const WarningCircle = (props: WarningCircleProps) => {
  return (
    <Circle
      center={[props.lat, props.long]}
      radius={props.radius}
      pathOptions={{
        fillColor: props.color,
        color: props.color,
        fillOpacity: 0.7,
      }}
    />
  );
};

export default WarningCircle;
