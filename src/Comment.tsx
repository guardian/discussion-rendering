import React from "react";
import { css, cx } from "emotion";
import { neutral } from "@guardian/src-foundations";
import { Comment as CommentModel } from "./api";

const commentControls = css`
  display: flex;

  li {
    flex: 1;
  }
`;

export const avatar = (avatarSize: number): string => css`
  border-radius: ${avatarSize}px;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
`;

export const Comment: React.FC<{ comment: CommentModel }> = ({ comment }) => {
  return (
    <div
      className={css`
        border-bottom: 1px solid ${neutral[97]};
      `}
    >
      <img
        src={comment.userProfile.avatar}
        alt={comment.userProfile.displayName}
        className={cx(
          avatar(60),
          css`
            float: left;
          `
        )}
      />
      <p
        className={css`
          float: left;
        `}
      >
        {comment.userProfile.displayName}
      </p>
      <p
        className={css`
          display: block;
          clear: left;
        `}
      >
        {comment.body}
      </p>
      <p>{comment.numRecommends}</p>
      <div className={commentControls}>
        <li>reply</li>
        <li>share</li>
        <li>pick</li>
        <li>report</li>
      </div>
    </div>
  );
};
