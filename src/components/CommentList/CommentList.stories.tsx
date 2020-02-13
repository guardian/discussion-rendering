import React from "react";
import { CommentList } from "./CommentList";

export default { component: CommentList, title: "CommentList" };

export const Default = () => <CommentList comments={[]} />;
Default.story = { name: "default" };
