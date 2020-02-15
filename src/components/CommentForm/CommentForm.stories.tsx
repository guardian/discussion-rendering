import React from "react";
import { CommentForm } from "./CommentForm";

export default { component: CommentForm, title: "CommentForm" };

const shortUrl = "/p/39f5z";

export const Default = () => (
  <CommentForm shortUrl={shortUrl} onAdd={() => {}} />
);

Default.story = { name: "default" };
