import React, { useContext } from "react";

import { Chart } from "react-google-charts";

import { AdventOfCodeDataContext } from "../../context/useAOC";

export default function GoogleChart() {
  const { setSelectedUser, pieChartData, displaySlices } = useContext(
    AdventOfCodeDataContext
  );

  return (
    <Chart
      chartEvents={[
        {
          eventName: "ready",
          callback: ({ chartWrapper, google }) => {
            const chart = chartWrapper.getChart();
            google.visualization.events.addListener(chart, "select", () => {
              const { row, column } = chart.getSelection()[0];
              if (row !== undefined) {
                setSelectedUser(pieChartData()[row + 1][0]);
              }
            });
          },
        },
      ]}
      height={"350px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={pieChartData()}
      options={{
        title: "Stars Collected",
        slices: displaySlices(),
        is3D: true,
      }}
      style={{ backgroundColor: "grey" }}
    />
  );
}
