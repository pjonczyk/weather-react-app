import React from "react";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";

function formatDate(unixTimeStap) {
  return new Date(unixTimeStap * 1000);
}

export default function CurrentWeatherDisplay() {
  const { loaded } = useSelector((state) => state.weather.currentWeather);
  const currentWeatherData = useSelector(
    (state) => state.weather.currentWeather.data
  );

  if (!loaded) {
    return <></>;
  }
  const { main, weather, wind, sys, name, dt } = currentWeatherData;

  const formattedDate = formatDate(dt);
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography
              variant="subtitle2"
              component="div"
              color="text.secondary"
            >
              {formattedDate.toLocaleDateString() +
                ", " +
                formattedDate.toLocaleTimeString()}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              gutterBottom
            >
              {name}, {sys.country}
            </Typography>
            <Typography variant="h3">{Math.round(main.temp)}°C</Typography>
            <Typography variant="body1">
              {" "}
              Feels like {Math.round(main.feels_like)}°C
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              color="text.secondary"
              gutterBottom
            >
              Wind
            </Typography>
            <Typography variant="h3">{wind.speed} m/s</Typography>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}
