import { Typography } from "@mui/material";
import Search from "./modules/Search/Search";
import WeatherDisplay from "./modules/WeatherDisplay/WeatherDisplay";

function App() {
  return (
    <div style={{ margin: "auto", width: "50%" }}>
      <Typography sx={{ textAlign: "center" }} variant="h2" component="div">
        The Weather App
      </Typography>
      <Search />
      <WeatherDisplay />
    </div>
  );
}

export default App;
