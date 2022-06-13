import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { setSelectedTown } from "../../state/searchSlice";
import {
  fetchCurrentWeatherForTown,
  fetchCurrentWeatherForZipCode,
  fetchForecastForTown,
  fetchForecastForZipCode,
} from "../../state/weatherSlice";

const divStyle = {
  display: "flex",
  margin: "auto",
  width: "60%",
};

export default function Search() {
  const selectedTown = useSelector((state) => state.search.selectedTown);
  const dispatch = useDispatch();

  let onChange = (event) => {
    dispatch(setSelectedTown(event.target.value));
  };

  let onSubmit = (event) => {
    if (selectedTown.match(/\b\d{5}\b/g)) {
      dispatch(fetchCurrentWeatherForZipCode(selectedTown));
      dispatch(fetchForecastForZipCode(selectedTown));
    } else {
      dispatch(fetchCurrentWeatherForTown(selectedTown));
      dispatch(fetchForecastForTown(selectedTown));
    }
  };

  return (
    <div style={divStyle}>
      <TextField
        sx={{ my: "20px" }}
        fullWidth
        value={selectedTown}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
        placeholder={"Search for places ..."}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
