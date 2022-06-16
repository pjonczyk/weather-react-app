import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
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
    <Box sx={{ mt: "30px" }}>
      <Typography variant="h3" gutterBottom>
        Current
      </Typography>
      <Card sx={{ display: "flex", maxWidth: "50%" }}>
        <CardContent sx={{ flex: 1, display: "flex", flexFlow: "column wrap" }}>
          <Box sx={{ display: "flex" }}>
            <Box>
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
                    return (
                      weatherElement.main + ". " + weatherElement.description
                    );
                  })}
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  weather[0].icon +
                  "@2x.png"
                }
                alt={"Current Weather"}
                style={{
                  width: "150px",
                  height: "150px",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              mt: "20px",
            }}
          >
            <Divider orientation="vertical" flexItem />
            <Grid container spacing={1} columns={10} sx={{}}>
              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  Visibility: {(visibility / 1000).toFixed(1)}km
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  Wind: {wind.speed}m/s
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  Pressure: {main.pressure}hPa
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  Humidity: {main.humidity}%
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  Cloudiness: {}%
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  Sunrise: {formatDate(sys.sunrise).toLocaleTimeString()}
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  Sunset: {formatDate(sys.sunset).toLocaleTimeString()}
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2" component="div">
                  Lat: {coord.lat} Lon: {coord.lon}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
