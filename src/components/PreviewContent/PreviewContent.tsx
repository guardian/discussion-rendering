import React from "react";
import { css } from "emotion";

import { Comment } from "../Comment/Comment";
import { Pick } from "../Pick/Pick";

export const PreviewContent = ({
  picks,
  comments
}: {
  comment: CommentType;
}) => {
  if (!!picks.length) {
    return (
      <div>
        <Pick comment={comments[0]} />
        {comments[1] && <Pick comment={comments[1]} />}
      </div>
    );
  } else if (!!comments.length) {
    return (
      <div>
        <Comment comment={comments[0]} />
        {comments[1] && <Comment comment={comments[1]} />}
      </div>
    );
  } else {
    return (
      <div>
        <p>No comments yet posted on article</p>
      </div>
    );
  }
};
