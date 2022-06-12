import React from "react";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";

const divStyle = {
  display: "flex",
};

export default function WeatherDisplay() {
  return (
    <div style={divStyle}>
      <CurrentWeatherDisplay />
      <ForecastDisplay />
    </div>
  );
}
