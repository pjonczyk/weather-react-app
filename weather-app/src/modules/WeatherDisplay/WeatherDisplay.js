import React from "react";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";

const divStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  margin: "auto",
  marginTop: "30px",
  width: "60%",
  gap: "40px",
};

export default function WeatherDisplay() {
  return (
    <div style={divStyle}>
      <CurrentWeatherDisplay />
      <ForecastDisplay />
    </div>
  );
}
