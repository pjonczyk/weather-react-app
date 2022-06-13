import { Divider, Typography } from "@mui/material";
import Search from "./modules/Search/Search";
import WeatherDisplay from "./modules/WeatherDisplay/WeatherDisplay";

const rootStyle = {
  height: "100vh",
  minHeight: "100vh",
};

function App() {
  return (
    <div style={rootStyle}>
      <Typography
        sx={{ textAlign: "center", mx: "auto", width: "60%", my: "10px" }}
        variant="h3"
        component="div"
      >
        Weather Forecast
      </Typography>
      <Search />
      <WeatherDisplay />
    </div>
  );
}

export default App;
