import React from "react";
import { css, cx } from "emotion";
import { neutral, space, palette } from "@guardian/src-foundations";
import { Comment as CommentModel } from "./api";
import { textSans } from "@guardian/src-foundations/typography";

import { Pillar } from "./types";
import { AbuseReportForm } from "./AbuseReportForm";

const commentControls = css`
  display: flex;
  list-style: none;

  li {
    flex: 1;
  }
`;

const commentCss = css`
  display: block;
  clear: left;
  ${textSans.small()}
`;

const commentWrapper = css`
  border-bottom: 1px solid ${neutral[97]};
  display: flex;
  padding: ${space[2]}px 0;
`;

const commentAvatar = css`
  min-width: 50px;
  height: 50px;
  margin-right: ${space[2]}px;
`;

const commentProfileName = (pillar: Pillar) => css`
  font-weight: bold;
  margin-top: 0;
  color: ${palette[pillar][400]};
`;

const commentDetails = css`
  flex-grow: 1;
`;

export const avatar = (avatarSize: number): string => css`
  border-radius: ${avatarSize + 10}px;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
`;

export const Comment: React.FC<{ comment: CommentModel; pillar: Pillar }> = ({
  comment,
  pillar
}) => {
  return (
    <div className={commentWrapper}>
      <img
        src={comment.userProfile.avatar}
        alt={comment.userProfile.displayName}
        className={cx(avatar(50), commentAvatar)}
      />

      <div className={commentDetails}>
        <p className={commentProfileName(pillar)}>
          {comment.userProfile.displayName}
        </p>
        <p
          className={commentCss}
          dangerouslySetInnerHTML={{ __html: comment.body }}
        ></p>
        <p>{comment.numRecommends}</p>
        <div className={commentControls}>
          <li>reply</li>
          <li>share</li>
          <li>pick</li>
          <li>
            <AbuseReportForm />
          </li>
        </div>
      </div>
    </div>
  );
};
