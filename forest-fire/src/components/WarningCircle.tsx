import "../App.css";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";

interface WarningCircleProps {
  color: string;
  lat: number;
  long: number;
  radius: number;
  popupText: string;
}
const WarningCircle = (props: WarningCircleProps) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleCircleClick = () => {
    setPopupOpen(!popupOpen);
  };

  
  // UseEffect to make remove the need for double click to see popup again.
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (popupOpen) {
        setPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    
  }, [popupOpen]);

  return (
    <div>
      <Circle
        center={[props.lat, props.long]}
        radius={props.radius}
        pathOptions={{
          fillColor: props.color,
          color: props.color,
          fillOpacity: 0.7,
        }}
        eventHandlers={{
          click: handleCircleClick 
        }}
      ></Circle>
      {popupOpen && <Popup position={[props.lat, props.long]} >{props.popupText}</Popup>}
    </div>
  );
};

export default WarningCircle;
