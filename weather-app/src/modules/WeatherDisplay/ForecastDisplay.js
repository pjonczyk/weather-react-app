import { Accordion } from "@mui/material";
import React from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { formatDate } from "../../utilities";

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

  dayData.forEach((data, i) => {
    console.log(i);
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
      noonDescription = data.weather.description;
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
  };
}

export default function ForecastDisplay() {
  const [expanded, setExpanded] = React.useState(false);
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
    <div style={{ flexGrow: 1 }}>
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
        } = generateAverageDataPerDay(dayData);

        return (
          <div key={key}>
            <Accordion expanded={expanded === key} onChange={handleChange(key)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={"panel" + key + "bh-header"}
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  {accordionSummaryDate}
                </Typography>
                <Typography align="right" sx={{ width: "45%", flexShrink: 0 }}>
                  {maxTemp + " / " + minTemp + "°C"}
                </Typography>
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
          </div>
        );
      })}
    </div>
  );
}
