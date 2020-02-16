import React from "react";
import { css, cx } from "emotion";

import { neutral, space, palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { Pillar, CommentType } from "../../types";

import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { AbuseReportForm } from "../AbuseReportForm/AbuseReportForm";

type Props = {
  comment: CommentType;
  pillar: Pillar;
};

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
  margin-top: 0.375rem;
  margin-bottom: 0.5rem;
`;

const commentWrapper = css`
  border-bottom: 1px solid ${neutral[86]};
  display: flex;
  padding: ${space[2]}px 0;
`;

const nestingStyles = css`
  list-style-type: none;
  padding-left: ${space[2]}px;
  margin-left: ${space[12] + "px"};
`;

const commentAvatar = css`
  min-width: 50px;
  height: 50px;
  margin-right: ${space[2]}px;
`;

const commentProfileName = (pillar: Pillar) => css`
  margin-top: 0;
  color: ${palette[pillar][400]};
  ${textSans.small()};
  font-weight: bold;
`;

const commentDetails = css`
  flex-grow: 1;
`;

const headerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const avatar = (avatarSize: number): string => css`
  border-radius: ${avatarSize + 10}px;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
`;

export const Comment = ({ comment, pillar }: Props) => {
  return (
    <li>
      <div className={commentWrapper}>
        <img
          src={comment.userProfile.avatar}
          alt={comment.userProfile.displayName}
          className={cx(avatar(50), commentAvatar)}
        />

        <div className={commentDetails}>
          <header className={headerStyles}>
            <div className={commentProfileName(pillar)}>
              {comment.userProfile.displayName}
            </div>
            <RecommendationCount
              commentId={comment.id}
              initialCount={comment.numRecommends}
              alreadyRecommended={false}
            />
          </header>
          <div
            className={commentCss}
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
          <div className={commentControls(pillar)}>
            <li>Reply</li>
            <li>Share</li>
            <li>Pick</li>
            <li>
              <AbuseReportForm commentId={comment.id} />
            </li>
          </div>
        </div>
      </div>
      {comment.responses && (
        <ul className={nestingStyles}>
          {comment.responses.map(comment => (
            <Comment comment={comment} pillar={pillar} />
          ))}
        </ul>
      )}
    </li>
  );
};
