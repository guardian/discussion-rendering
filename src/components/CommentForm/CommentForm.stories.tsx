import React from "react";
import { CommentForm } from "./CommentForm";

export default { component: CommentForm, title: "CommentForm" };

const shortUrl: string = "/p/39f5z";

export const Default = () => <CommentForm shortUrl={shortUrl} />;
Default.story = { name: "default" };
