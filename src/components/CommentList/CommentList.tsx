import React from "react";
import { css } from "emotion";

import { CommentType } from "../../types";
import { Comment } from "../Comment/Comment";

type Props = {
  comments?: CommentType[];
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const CommentList = ({ comments }: Props) => {
  if (!comments?.length) {
    return <p>TODO: No comment component goes here</p>;
  }

  return (
    <div className={containerStyles}>
      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} pillar="news" />
      ))}
    </div>
  );
};
