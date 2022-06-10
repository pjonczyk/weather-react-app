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
  listData.forEach((data, i) => {
    const day = data.dt_txt.split(" ")[0];
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

function generateDayTempMinMax(dayData) {
  let minTemp = Number.MAX_VALUE;
  let maxTemp = Number.MIN_VALUE;
  dayData.forEach((data) => {
    const currentTemp = data.main.temp;
    minTemp > currentTemp && (minTemp = currentTemp);
    maxTemp < currentTemp && (maxTemp = currentTemp);
  });
  return Math.round(maxTemp) + " / " + Math.round(minTemp) + "°C";
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
    <div>
      {Array.from(groupedByDayDataMap.values()).map((dayData, key) => {
        const accordionSummaryDate = generateAccordionSummaryDateText(
          dayData[0]
        );
        const minMaxTemps = generateDayTempMinMax(dayData);

        return (
          <div key={key}>
            <Accordion expanded={expanded === key} onChange={handleChange(key)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={"panel" + key + "bh-header"}
              >
                <Typography>
                  {accordionSummaryDate + " " + minMaxTemps}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
