import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Paper, Typography } from "@mui/material";
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
    <Card sx={{ flexGrow: 1 }}>
      <CardContent>
        <Typography variant="subtitle1" component="div">
          {formattedDate.toLocaleDateString() +
            ", " +
            formattedDate.toLocaleTimeString()}
        </Typography>
        <Typography variant="h4" component="div" gutterBottom>
          {name + ", " + sys.country}
        </Typography>
        <Typography variant="h3" component="div">
          {Math.round(main.temp)}°C
        </Typography>
        <Typography gutterBottom>
          {"Feels like " +
            Math.round(main.feels_like) +
            "°C. " +
            weather.map((weatherElement, i) => {
              return weatherElement.main + ". " + weatherElement.description;
            })}
        </Typography>
        <Typography sx={{ width: "50%" }}>
          Visibility: {(visibility / 1000).toFixed(1)}km
        </Typography>
        <Typography sx={{ width: "50%" }}>Wind: {wind.speed}m/s</Typography>
        <Typography>Pressure: {main.pressure}hPa</Typography>
        <Typography>Humidity: {main.humidity}%</Typography>
        <Typography>Cloudiness: {}%</Typography>
        <Typography>
          Sunrise: {formatDate(sys.sunrise).toLocaleTimeString()}
        </Typography>
        <Typography>
          Sunset: {formatDate(sys.sunset).toLocaleTimeString()}
        </Typography>
        <Typography variant="body2" component="div">
          Lon: {coord.lon} Lat: {coord.lat}
        </Typography>
      </CardContent>
    </Card>
  );
}
