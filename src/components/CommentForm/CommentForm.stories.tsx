import React from "react";
import { CommentForm } from "./CommentForm";

export default { component: CommentForm, title: "CommentForm" };

const shortURL = "/p/39f5z";

export const Default = () => <CommentForm shortURL={shortURL} />;

Default.story = { name: "default" };
