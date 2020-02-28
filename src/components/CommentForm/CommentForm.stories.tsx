import React from "react";
import { CommentForm } from "./CommentForm";

export default { component: CommentForm, title: "CommentForm" };

const shortUrl = "/p/39f5z";

const aUser = {
  userId: "abc123",
  displayName: "Jane Smith",
  webUrl: "",
  apiUrl: "",
  avatar: "",
  secureAvatarUrl: "",
  badge: [],
  privateFields: {
    canPostComment: true,
    isPremoderated: false,
    hasCommented: true
  }
};

export const Default = () => (
  <CommentForm
    shortUrl={shortUrl}
    user={aUser}
    onAddComment={(commentId, body, user) => {}}
  />
);

Default.story = { name: "default" };
