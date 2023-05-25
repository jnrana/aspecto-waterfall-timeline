import React from "react";
import { Tooltip } from "@mui/material";
import { TimelineBar } from "./styles";

const colors = {
  messaging: "rgb(204, 118, 0)",
  http: "rgb(255, 149, 31)",
  database: "rgb(206, 146, 216)",
};

function Bar({ event, totalDuration, minDate, maxDate }) {
  const duration = Math.ceil(event.duration / 1000000);
  const width = Math.ceil((duration * 100) / totalDuration);
  const color = colors[event.attrs["aspecto.calc.class"]];

  let offset = new Date(event.startTime) - new Date(minDate);
  let offsetPercentage = Math.ceil((offset * 100) / totalDuration);

  const title = `From ${Math.floor(offset)}ms to ${Math.ceil(
    offset + duration
  )}ms | Duration : ${duration}ms`;

  return (
    <Tooltip title={title} placement="top">
      <TimelineBar color={color} width={width} offset={offsetPercentage} />
    </Tooltip>
  );
}

export default Bar;
