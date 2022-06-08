import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiKey = "731d48ef2dda9f521fbd420bc3be3f6a";
const urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?";
const urlForecast = "https://api.openweathermap.org/data/2.5/forecast?";

const initialState = {
  currentWeather: undefined,
  forecast: undefined,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeatherForTown.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeatherForZipCode.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
      })
      .addCase(fetchForecastForTown.fulfilled, (state, action) => {
        state.forecast = action.payload;
      })
      .addCase(fetchForecastForZipCode.fulfilled, (state, action) => {
        state.forecast = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = weatherSlice.actions;

export default weatherSlice.reducer;

export const fetchCurrentWeatherForTown = createAsyncThunk(
  "weather/fetchCurrentWeatherForTown",
  async (town, thunkAPI) => {
    const response = await fetch(
      urlCurrentWeather + "q=" + town + ",de&units=metric&appid=" + apiKey
    ).then((data) => data.json());
    return response;
  }
);

export const fetchCurrentWeatherForZipCode = createAsyncThunk(
  "weather/fetchCurrentWeatherForZipCode",
  async (zipCode, thunkAPI) => {
    const response = await fetch(
      urlCurrentWeather + "zip=" + zipCode + ",de&units=metric&appid=" + apiKey
    ).then((data) => data.json());
    return response;
  }
);

export const fetchForecastForTown = createAsyncThunk(
  "weather/fetchForecastForTown",
  async (town, thunkAPI) => {
    const response = await fetch(
      urlForecast + "q=" + town + ",de&units=metric&appid=" + apiKey
    ).then((data) => data.json());
    return response;
  }
);

export const fetchForecastForZipCode = createAsyncThunk(
  "weather/fetchForecastForZipCode",
  async (zipCode, thunkAPI) => {
    const response = await fetch(
      urlForecast + "zip=" + zipCode + ",de&units=metric&appid=" + apiKey
    ).then((data) => data.json());
    return response;
  }
);
