import PredictionDataProps from "./PredictionDataProps";

export default interface MapContProps {
    mapLat: number;
    mapLong: number;
    zoom: number;
    circleData: PredictionDataProps[];
  }