"use client";
import { Chart } from "react-google-charts";

export const data = [
    ["task", "difficulty level"],
    ["hard", 35],
    ["medium", 20],
    ["easy", 24],
];

export const options = {
  title: "Tours Difficulty",
  is3D: true,
  titleTextStyle: {
    color: "black",
    fontName: "Helvetica",
    fontSize: 20,
    bold: true,
    italic: true,
  },
  legend: {position: 'bottom', textStyle: {color: 'blue', fontSize: 16}}
};

export function AdminPieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
