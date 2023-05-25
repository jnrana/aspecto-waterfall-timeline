import React, { useState, useEffect } from "react";
import jsonData from "./data.json";
import { unFlattenData } from "../utils/helper";

import TimelineWaterfall from "../components/TimelineWaterfall";

function Timeline() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const res = unFlattenData(jsonData.spans);
    setData(res);
  }, []);

  return (
    <div>
      <TimelineWaterfall data={data} />
    </div>
  );
}

export default Timeline;
