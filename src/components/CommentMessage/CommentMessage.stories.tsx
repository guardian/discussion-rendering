import React from "react";

import { CommentMessage } from "./CommentMessage";
import { comment } from "../../fixtures/comment";
import { staffUser } from "../../fixtures/user";

export default { component: CommentMessage, title: "CommentMessage" };

export const Default = () => (
  <CommentMessage
    comment={comment}
    pillar="news"
    setCommentBeingRepliedTo={_ => {}}
    user={staffUser}
    isHighlighted={false}
    setIsHighlighted={() => {}}
    setError={() => {}}
  />
);
Default.story = {
  name: "Default Content Message"
};

export const Highlighted = () => (
  <CommentMessage
    comment={comment}
    pillar="news"
    setCommentBeingRepliedTo={_ => {}}
    user={staffUser}
    isHighlighted={true}
    setIsHighlighted={() => {}}
    setError={() => {}}
  />
);
Highlighted.story = {
  name: "Highlighted Content Message"
};

export const Blocked = () => (
  <CommentMessage
    comment={{ ...comment, status: "blocked" }}
    pillar="news"
    setCommentBeingRepliedTo={_ => {}}
    user={staffUser}
    isHighlighted={false}
    setIsHighlighted={() => {}}
    setError={() => {}}
  />
);
Blocked.story = {
  name: "Blocked Content Message"
};
