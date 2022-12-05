import React, { useContext } from "react";

import { AdventOfCodeDataContext } from "../../pages/_app";

import DayRow from "./DayRow";

export default function DayBreakdown() {
  const context = useContext(AdventOfCodeDataContext);

  return (
    <div className="my-3 bg-dark p-3">
      {Object.entries(context.completionTimeline()).map(([key, item]) => (
        <DayRow item={item} index={key} key={key + "day--row"} />
      ))}
    </div>
  );
}
