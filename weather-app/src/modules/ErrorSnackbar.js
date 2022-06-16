import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetWeather } from "../state/weatherSlice";

export default function ErrorSnackbar() {
  const weatherError = useSelector(
    (state) => state.weather.currentWeather.error
  );
  const forecastError = useSelector((state) => state.weather.forecast.error);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    console.log("Test");
    dispatch(resetWeather());
    if (reason === "clickaway") {
      return;
    }
  };
  const transitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  return (
    <Snackbar
      open={weatherError || forecastError}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={transitionUp}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        No results found
      </Alert>
    </Snackbar>
  );
}
