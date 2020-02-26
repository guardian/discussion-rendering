import React from "react";
import { css } from "emotion";

import { CommentType, ThreadsType } from "../../types";
import { Comment } from "../Comment/Comment";

type Props = {
  comments?: CommentType[];
  threads: ThreadsType;
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
`;

export const CommentList = ({ comments, threads }: Props) => {
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
          threads={threads}
        />
      ))}
    </ul>
  );
};
