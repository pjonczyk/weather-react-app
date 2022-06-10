import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../../utilities";

export default function CurrentWeatherDisplay() {
  const { loaded } = useSelector((state) => state.weather.currentWeather);
  const currentWeatherData = useSelector(
    (state) => state.weather.currentWeather.data
  );

  if (!loaded) {
    return <></>;
  }
  const { coord, main, weather, visibility, wind, sys, name, dt } =
    currentWeatherData;

  const formattedDate = formatDate(dt);
  return (
    <div
      sx={{
        display: "flex",
        gap: "20px",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography>
            Lon: {coord.lon} Lat: {coord.lat}
          </Typography>
          <Typography>{formattedDate.toLocaleDateString()}</Typography>
          <Typography>{formattedDate.toLocaleTimeString()}</Typography>

          <Typography>{name + ", " + sys.country}</Typography>
          <Typography>Temperature: {Math.round(main.temp)}°C</Typography>
          <Typography> Feels like {Math.round(main.feels_like)}°C</Typography>
          {weather.map((weatherElement, i) => {
            return (
              <div key={i}>
                <Typography>{weatherElement.main}</Typography>
                <Typography>{weatherElement.description}</Typography>
              </div>
            );
          })}
          <Typography>Visbility: {(visibility / 1000).toFixed(1)}km</Typography>
          <Typography>Wind: {wind.speed}m/s</Typography>
          <Typography>Pressure: {main.pressure}hPa</Typography>
          <Typography>Humidity: {main.humidity}%</Typography>
          <Typography>Cloudiness: {}%</Typography>
          <Typography>
            Sunrise: {formatDate(sys.sunrise).toLocaleTimeString()}
          </Typography>
          <Typography>
            Sunset: {formatDate(sys.sunset).toLocaleTimeString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
