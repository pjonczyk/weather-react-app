import { Typography } from "@mui/material";
import Search from "./modules/Search/Search";
import WeatherDisplay from "./modules/WeatherDisplay/WeatherDisplay";

function App() {
  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        The Weather App
      </Typography>
      <Search />
      <WeatherDisplay />
    </>
  );
}

export default App;
