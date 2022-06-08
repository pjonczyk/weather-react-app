import React from "react";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";

export default function WeatherDisplay() {
  return (
    <>
      <CurrentWeatherDisplay />
      <ForecastDisplay />
    </>
  );
}
