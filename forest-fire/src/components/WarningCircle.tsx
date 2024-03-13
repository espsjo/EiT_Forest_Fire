import "../App.css";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import WarningCircleProps from "../interfaces/WarningCircleProps";

const WarningCircle = (props: WarningCircleProps) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const handleCircleClick = () => {
    setPopupOpen(!popupOpen);
  };

  // UseEffect to remove the need for double click to see popup again.
  useEffect(() => {
    const handleOutsideClick = () => {
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
        center={[props.latitude, props.longitude]}
        radius={props.radius}
        pathOptions={{
          fillColor: props.color,
          color: props.color,
          fillOpacity: 0.7,
        }}
        eventHandlers={{
          click: handleCircleClick,
        }}
      ></Circle>
      {popupOpen && (
        <Popup position={[props.latitude, props.longitude]}>
          {props.popupText}
          {props.popupImage && (
            <img
              src={props.popupImage}
              alt=""
              style={{
                display: "block",
                margin: "10px auto",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          )}
        </Popup>
      )}
    </div>
  );
};

export default WarningCircle;
