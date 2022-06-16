import { Accordion, Box } from "@mui/material";
import React from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { formatDate, capitalizeString } from "../../utilities";
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function groupByDay(listData) {
  let groupedData = new Map();
  const today = new Date().toISOString().slice(0, 10);

  listData.forEach((data, i) => {
    const day = data.dt_txt.split(" ")[0];
    if (today === day) {
      return;
    }
    if (groupedData.has(day)) {
      let dayData = groupedData.get(day);
      dayData.push(data);
      groupedData.set(day, dayData);
    } else {
      groupedData.set(day, [data]);
    }
  });
  return groupedData;
}

function generateAccordionSummaryDateText(dayData) {
  const formattedDate = formatDate(dayData.dt);
  return (
    weekday[formattedDate.getDay()] +
    ", " +
    month[formattedDate.getMonth()] +
    " " +
    formattedDate.getDate()
  );
}

function generateAverageDataPerDay(dayData) {
  let averageWinds = 0;
  let averagePressure = 0;
  let averageHumidity = 0;
  let noonDescription;
  let minTemp = Number.MAX_VALUE;
  let maxTemp = Number.MIN_VALUE;
  let weatherIcondId = "";

  dayData.forEach((data, i) => {
    averageWinds += data.wind.speed;
    averagePressure += data.main.pressure;
    averageHumidity += data.main.humidity;
    const currentTemp = data.main.temp;
    if (minTemp > currentTemp) {
      minTemp = currentTemp;
    }
    if (maxTemp < currentTemp) {
      maxTemp = currentTemp;
    }
    if (i === 4) {
      const firstweather = data.weather[0];
      noonDescription =
        firstweather.main + ". " + capitalizeString(firstweather.description);
      weatherIcondId = firstweather.icon;
    }
  });

  const datapoints = dayData.length;
  averageWinds = (averageWinds / datapoints).toFixed(2);
  averagePressure = Math.round(averagePressure / datapoints);
  averageHumidity = Math.round(averageHumidity / datapoints);

  return {
    averageWinds: averageWinds,
    averagePressure: averagePressure,
    averageHumidity: averageHumidity,
    noonDescription: noonDescription,
    minTemp: Math.round(minTemp),
    maxTemp: Math.round(maxTemp),
    weatherIcondId: weatherIcondId,
  };
}

export default function ForecastDisplay() {
  const [expanded, setExpanded] = React.useState(0);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const forecastData = useSelector((state) => state.weather.forecast.data);
  const { loaded } = useSelector((state) => state.weather.forecast);

  if (!loaded) {
    return <></>;
  }

  const groupedByDayDataMap = groupByDay(forecastData.list);
  return (
    <Box sx={{ mt: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Forecast
      </Typography>
      {Array.from(groupedByDayDataMap.values()).map((dayData, key) => {
        const accordionSummaryDate = generateAccordionSummaryDateText(
          dayData[0]
        );
        const {
          averageWinds,
          averagePressure,
          averageHumidity,
          noonDescription,
          maxTemp,
          minTemp,
          weatherIcondId,
        } = generateAverageDataPerDay(dayData);

        return (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={handleChange(key)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={"panel" + key + "bh-header"}
            >
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <Typography sx={{ flexShrink: 0 }}>
                  {accordionSummaryDate}
                </Typography>
                <img
                  src={
                    "http://openweathermap.org/img/wn/" +
                    weatherIcondId +
                    "@2x.png"
                  }
                  alt={"Current Weather"}
                  style={{
                    width: "35px",
                    height: "35px",
                    marginLeft: "auto",
                  }}
                />
                <Typography align="right" sx={{ mx: "25px" }}>
                  {maxTemp + " / " + minTemp + "°C"}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{noonDescription}</Typography>
              <Typography>
                The high will be {maxTemp}°C, the low will be {minTemp}°C.
              </Typography>
              <Typography>Wind: {averageWinds}m/s</Typography>
              <Typography>Pressure: {averagePressure}hPa</Typography>
              <Typography>Humidity: {averageHumidity}%</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
