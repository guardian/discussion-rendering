import React from "react";
import { Timestamp } from "./Timestamp";

export default { component: Timestamp, title: "Timestamp" };

export const Default = () => (
  <Timestamp isoDateTime={new Date("2010-11-18T14:22:39Z")} />
);
Default.story = { name: "default" };
