import React from "react";
import { Comments } from "./Comments";

export default { component: Comments, title: "Comments" };

export const Default = () => <Comments shortUrl="abc" />;
Default.story = { name: "default" };
