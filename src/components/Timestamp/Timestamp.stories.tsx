import React from "react";
import { Timestamp } from "./Timestamp";

export default { component: Timestamp, title: "Timestamp" };

const hoursBeforeNow = (hours: number) => {
  var date = new Date();
  return date.setHours(date.getHours() - hours);
};

export const Default = () => (
  <Timestamp isoDateTime={new Date("2010-11-18T14:22:39Z")} />
);
Default.story = { name: "default" };

export const OneHour = () => <Timestamp isoDateTime={hoursBeforeNow(1)} />;
OneHour.story = { name: "One Hour" };

export const TwentyThreeHours = () => (
  <Timestamp isoDateTime={hoursBeforeNow(23)} />
);
TwentyThreeHours.story = { name: "Twenty three hours" };

export const TwentyFiveHours = () => (
  <Timestamp isoDateTime={hoursBeforeNow(25)} />
);
TwentyFiveHours.story = { name: "Twenty five hours" };
