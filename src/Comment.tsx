import React from "react";
import { css, cx } from "emotion";
import { neutral, space, palette } from "@guardian/src-foundations";
import { Comment as CommentModel } from "./api";
import { textSans } from "@guardian/src-foundations/typography";

import { Pillar } from "./types";
import { AbuseReportForm } from "./AbuseReportForm";


const commentControls = (pillar: Pillar) => css`
  list-style: none;
  ${textSans.xsmall()};

  * {
    display: inline-block;
  }

  *:not(:last-child) {
    font-weight: bold;
    margin-right: ${space[2]}px;
    color: ${palette[pillar][400]};
  }

  *:last-child {
    float: right;
    font-weight: normal;
  }
`;

const commentCss = css`
  display: block;
  clear: left;
  ${textSans.small()}
`;

const commentWrapper = (nested: boolean) => css`
  border-top: 1px solid ${neutral[97]};
  display: flex;
  padding: ${space[2]}px 0;
  margin-left: ${nested ? space[12]+'px' : 0}
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

export const Comment: React.FC<{ comment: CommentModel; pillar: Pillar; nested?: boolean; }> = ({
  comment,
    pillar,
  nested = false
}) => {
    return (
      <>
    <div className={commentWrapper(nested)}>
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
        <div className={commentControls(pillar)}>
          <li>Reply</li>
          <li>Share</li>
          <li>Pick</li>
          <li><AbuseReportForm /></li>
        </div>
          </div>
      </div>
            {comment.responses && comment.responses.map(comment => <Comment comment={comment} pillar={pillar} nested={true} />)}
            </>
  );
};
