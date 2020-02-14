import React from "react";
import { css } from "emotion";

import { Comment as CommentModel } from "../../lib/api";
import { Comment } from "../Comment/Comment";

type Props = {
  comments?: CommentModel[];
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
        <Comment comment={comment} pillar="news" />
      ))}
    </div>
  );
};
