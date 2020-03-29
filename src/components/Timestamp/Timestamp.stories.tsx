import React from "react";
import MockDate from "mockdate";

import { Timestamp } from "./Timestamp";

export default { component: Timestamp, title: "Timestamp" };

MockDate.set("Sun Nov 17 2019 12:00:00 GMT+0000 (Greenwich Mean Time)");

export const TwoMonths = () => (
  <Timestamp isoDateTime={"2019-09-14T14:22:39Z"} linkTo="" />
);
TwoMonths.story = { name: "Two months" };

export const OneHour = () => (
  <Timestamp isoDateTime={"2019-11-17T11:00:00Z"} linkTo="" />
);
OneHour.story = { name: "One Hour" };

export const TwentyThreeHours = () => (
  <Timestamp isoDateTime={"2019-11-16T13:00:00Z"} linkTo="" />
);
TwentyThreeHours.story = { name: "Twenty three hours" };

export const TwentyFiveHours = () => (
  <Timestamp isoDateTime={"2019-11-16T11:00:00Z"} linkTo="" />
);
TwentyFiveHours.story = { name: "Twenty five hours" };
