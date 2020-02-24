import React from "react";
import { css } from "emotion";

import { CommentType, UserProfile } from "../../types";
import { Comment } from "../Comment/Comment";

type Props = {
  comments?: CommentType[];
  shortUrl: string;
  user?: UserProfile;
  replyAdded: (commentId: number, body: string, user: UserProfile) => void;
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
`;

export const CommentList = ({ comments }: Props) => {
  if (!comments?.length) {
    return <p>TODO: No comment component goes here</p>;
  }

  return (
    <ul className={containerStyles}>
      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} pillar="news" />
      ))}
    </ul>
  );
};
