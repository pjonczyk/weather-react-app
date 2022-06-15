import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
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
    <Card sx={{ display: "flex" }}>
      <CardContent sx={{ flex: 1, display: "flex", flexFlow: "column wrap" }}>
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
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexGrow: "auto",
          }}
        >
          <Divider orientation="vertical" flexItem />
          <Grid container spacing={2} columns={10}>
            <Grid item xs={5}>
              <Typography>
                Visibility: {(visibility / 1000).toFixed(1)}km
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>Wind: {wind.speed}m/s</Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>Pressure: {main.pressure}hPa</Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>Humidity: {main.humidity}%</Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>Cloudiness: {}%</Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>
                Sunrise: {formatDate(sys.sunrise).toLocaleTimeString()}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography>
                Sunset: {formatDate(sys.sunset).toLocaleTimeString()}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography variant="body2" component="div">
                Lon: {coord.lon} Lat: {coord.lat}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
