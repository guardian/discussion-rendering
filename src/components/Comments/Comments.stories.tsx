import React from "react";
import { Comments } from "./Comments";

export default { component: Comments, title: "Comments" };

export const Default = () => <Comments shortUrl="/p/39f5z" />;
Default.story = { name: "default" };
