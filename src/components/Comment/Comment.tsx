import React from "react";
import { css, cx } from "emotion";

import { neutral, space, palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { Pillar, CommentType } from "../../types";
import { GuardianStaff, GuardianPick } from "../Badges/Badges";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { AbuseReportForm } from "../AbuseReportForm/AbuseReportForm";
import { Timestamp } from "../Timestamp/Timestamp";

type Props = {
  comment: CommentType;
  pillar: Pillar;
  setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void;
};

const commentControls = css`
  list-style: none;
  ${textSans.xsmall()};
  display: flex;
  align-items: flex-start;
`;

const commentControlsButton = (pillar: Pillar) => css`
  font-weight: bold;
  margin-right: ${space[2]}px;
  color: ${palette[pillar][400]};
  border: 0;
  cursor: pointer;
`;

const spaceBetween = css`
  display: flex;
  justify-content: space-between;
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

const iconWrapper = css`
  padding: 2px;
  white-space: nowrap;
`;

const timestampWrapperStyles = css`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const avatar = (avatarSize: number): string => css`
  border-radius: ${avatarSize + 10}px;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
`;

const Column = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
    `}
  >
    {children}
  </div>
);

const Row = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      display: flex;
      flex-direction: row;
    `}
  >
    {children}
  </div>
);

export const Comment = ({
  comment,
  pillar,
  setCommentBeingRepliedTo
}: Props) => {
  const commentControlsButtonStyles = commentControlsButton(pillar);
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
            <Column>
              <Row>
                <div className={commentProfileName(pillar)}>
                  {comment.userProfile.displayName}
                </div>
                <div className={timestampWrapperStyles}>
                  <Timestamp
                    isoDateTime={comment.isoDateTime}
                    linkTo={`https://discussion.code.dev-theguardian.com/comment-permalink/${comment.id}`}
                  />
                </div>
              </Row>
              <Row>
                <div className={iconWrapper}>
                  {comment.userProfile.badge.filter(
                    obj => obj["name"] === "Staff"
                  ) && <GuardianStaff />}
                </div>
                <div className={iconWrapper}>
                  {comment.isHighlighted && <GuardianPick />}
                </div>
              </Row>
            </Column>
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
          <div className={spaceBetween}>
            <div className={commentControls}>
              <button
                onClick={() => setCommentBeingRepliedTo(comment)}
                className={commentControlsButtonStyles}
              >
                Reply
              </button>
              <button className={commentControlsButtonStyles}>Share</button>
              <button className={commentControlsButtonStyles}>Pick</button>
            </div>
            <div>
              <AbuseReportForm commentId={comment.id} pillar={pillar} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
