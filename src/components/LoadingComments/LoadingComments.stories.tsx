import React from "react";
import { LoadingComments } from "./LoadingComments";

export default { component: LoadingComments, title: "LoadingComments" };

export const Default = () => {
  return (
    <>
      <LoadingComments />
    </>
  );
};
Default.story = { name: "default" };
