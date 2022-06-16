import { Box, Typography } from "@mui/material";
import Footer from "./modules/Footer/footer";
import Search from "./modules/Search/Search";
import CurrentWeatherDisplay from "./modules/WeatherDisplay/CurrentWeatherDisplay";
import ForecastDisplay from "./modules/WeatherDisplay/ForecastDisplay";
const rootStyle = {
  height: "100vh",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const boxStyle = {
  width: "40%",
  m: "auto",
  mt: "0",
};

function App() {
  return (
    <Box sx={rootStyle}>
      <Box sx={boxStyle}>
        <Typography
          sx={{
            textAlign: "center",
            mx: "auto",
            mb: "30px",
            pt: "30px",
          }}
          variant="h2"
          component="div"
        >
          Weather Forecast
        </Typography>
        <Search />
        <CurrentWeatherDisplay />
        <ForecastDisplay />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
