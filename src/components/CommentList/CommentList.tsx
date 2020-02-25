import React from "react";
import { css } from "emotion";

import { CommentType, UserProfile } from "../../types";
import { Comment } from "../Comment/Comment";

type Props = {
  comments?: CommentType[];
  shortUrl: String;
  user?: UserProfile;
  submitComment: (
    shortUrl: string,
    body: string,
    user: UserProfile,
    parentCommentId: string
  ) => Promise<void>;
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
`;

export const CommentList = ({ comments, submitComment }: Props) => {
  if (!comments?.length) {
    return <p>TODO: No comment component goes here</p>;
  }

  return (
    <ul className={containerStyles}>
      {comments?.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          pillar="news"
          submitComment={submitComment}
        />
      ))}
    </ul>
  );
};
