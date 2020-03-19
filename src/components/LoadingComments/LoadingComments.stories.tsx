import React from "react";
import { LoadingComments } from "./LoadingComments";

export default { component: LoadingComments, title: "LoadingComments" };

export const Default = () => {
  return (
export const Default = () => <LoadingComments />
      <LoadingComments />
    </>
  );
};
Default.story = { name: "default" };
