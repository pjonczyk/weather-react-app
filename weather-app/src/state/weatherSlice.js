import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiKey = "731d48ef2dda9f521fbd420bc3be3f6a";
const urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?";
const urlForecast = "https://api.openweathermap.org/data/2.5/forecast?";

const initialState = {
  currentWeather: {
    loaded: false,
    error: false,
    data: undefined,
  },
  forecast: {
    loaded: false,
    error: false,
    data: undefined,
  },
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    resetWeather: (state, action) => {
      state.currentWeather.error = false;
      state.currentWeather.loaded = false;
      state.forecast.error = false;
      state.forecast.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeatherForTown.fulfilled, (state, action) => {
        state.currentWeather.data = action.payload;
        state.currentWeather.loaded = true;
      })
      .addCase(fetchCurrentWeatherForZipCode.fulfilled, (state, action) => {
        state.currentWeather.data = action.payload;
        state.currentWeather.loaded = true;
      })
      .addCase(fetchForecastForTown.fulfilled, (state, action) => {
        state.forecast.data = action.payload;
        state.forecast.loaded = true;
      })
      .addCase(fetchForecastForZipCode.fulfilled, (state, action) => {
        state.forecast.data = action.payload;
        state.forecast.loaded = true;
      })
      .addCase(fetchCurrentWeatherForTown.rejected, (state, action) => {
        state.currentWeather.error = true;
      })
      .addCase(fetchCurrentWeatherForZipCode.rejected, (state, action) => {
        state.currentWeather.error = true;
      })
      .addCase(fetchForecastForTown.rejected, (state, action) => {
        state.forecast.error = true;
      })
      .addCase(fetchForecastForZipCode.rejected, (state, action) => {
        state.forecast.error = true;
      });
  },
});

export const { increment, decrement, incrementByAmount, resetWeather } =
  weatherSlice.actions;

export default weatherSlice.reducer;

export const fetchCurrentWeatherForTown = createAsyncThunk(
  "weather/fetchCurrentWeatherForTown",
  async (town, thunkAPI) => {
    const response = await fetch(
      urlCurrentWeather + "q=" + town + ",de&units=metric&appid=" + apiKey
    );
    if (!response.ok) {
      const err = new Error("Not 2xx response");
      err.response = response;
      throw err;
    }
    return await response.json();
  }
);

export const fetchCurrentWeatherForZipCode = createAsyncThunk(
  "weather/fetchCurrentWeatherForZipCode",
  async (zipCode, thunkAPI) => {
    const response = await fetch(
      urlCurrentWeather + "zip=" + zipCode + ",de&units=metric&appid=" + apiKey
    );
    if (!response.ok) {
      const err = new Error("Not 2xx response");
      err.response = response;
      throw err;
    }
    return await response.json();
  }
);

export const fetchForecastForTown = createAsyncThunk(
  "weather/fetchForecastForTown",
  async (town, thunkAPI) => {
    const response = await fetch(
      urlForecast + "q=" + town + ",de&units=metric&appid=" + apiKey
    );
    if (!response.ok) {
      const err = new Error("Not 2xx response");
      err.response = response;
      throw err;
    }
    return await response.json();
  }
);

export const fetchForecastForZipCode = createAsyncThunk(
  "weather/fetchForecastForZipCode",
  async (zipCode, thunkAPI) => {
    const response = await fetch(
      urlForecast + "zip=" + zipCode + ",de&units=metric&appid=" + apiKey
    );
    if (!response.ok) {
      const err = new Error("Not 2xx response");
      err.response = response;
      throw err;
    }
    return await response.json();
  }
);
