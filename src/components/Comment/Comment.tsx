import React, { useState } from "react";
import { css, cx } from "emotion";

import { neutral, space, palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { Pillar, CommentType, UserProfile } from "../../types";
import { GuardianStaff, GuardianPick } from "../Badges/Badges";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { AbuseReportForm } from "../AbuseReportForm/AbuseReportForm";
import { Timestamp } from "../Timestamp/Timestamp";
import { pickComment } from "../../lib/api";
import { Avatar } from "../Avatar/Avatar";

type Props = {
  user?: UserProfile;
  comment: CommentType;
  pillar: Pillar;
  setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void;
  isReply: boolean;
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

const avatarMargin = css`
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

const linkStyles = css`
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
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
  setCommentBeingRepliedTo,
  user,
  isReply
}: Props) => {
  const commentControlsButtonStyles = commentControlsButton(pillar);
  const [scopedComment, setScopedComment] = useState(comment);
  const [error, setError] = useState<string>();

  const pick = async () => {
    setError("");
    const response = await pickComment(scopedComment.id);
    if (response.status === "error") {
      setError(response.message);
    } else {
      setScopedComment({
        ...scopedComment,
        isHighlighted: !scopedComment.isHighlighted
      });
    }
  };

  return (
    <>
      {error && (
        <span
          className={css`
            color: red;
          `}
        >
          {error}
        </span>
      )}
      <div className={commentWrapper}>
        <div className={avatarMargin}>
          <Avatar
            imageUrl={comment.userProfile.avatar}
            displayName={comment.userProfile.displayName}
            size={isReply ? "small" : "medium"}
          />
        </div>

        <div className={commentDetails}>
          <header className={headerStyles}>
            <Column>
              <Row>
                <div className={commentProfileName(pillar)}>
                  <a
                    href={`https://profile.theguardian.com/user/${comment.userProfile.userId}`}
                    className={linkStyles}
                  >
                    {comment.userProfile.displayName}
                  </a>
                </div>
                <div className={timestampWrapperStyles}>
                  <Timestamp
                    isoDateTime={scopedComment.isoDateTime}
                    linkTo={`https://discussion.code.dev-theguardian.com/comment-permalink/${scopedComment.id}`}
                  />
                </div>
              </Row>
              <Row>
                <div className={iconWrapper}>
                  {scopedComment.userProfile.badge.filter(
                    obj => obj["name"] === "Staff"
                  ) && <GuardianStaff />}
                </div>
                <div className={iconWrapper}>
                  {scopedComment.isHighlighted && <GuardianPick />}
                </div>
              </Row>
            </Column>
            <RecommendationCount
              commentId={scopedComment.id}
              initialCount={scopedComment.numRecommends}
              alreadyRecommended={false}
            />
          </header>
          <div
            className={commentCss}
            dangerouslySetInnerHTML={{ __html: scopedComment.body }}
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
              {/* Only staff can pick, and they cannot pick thier own comment */}
              {user &&
                user.badge.some(e => e.name === "Staff") &&
                user.userId !== scopedComment.userProfile.userId && (
                  <button
                    onClick={pick}
                    className={commentControlsButtonStyles}
                  >
                    {scopedComment.isHighlighted ? "Unpick" : "Pick"}
                  </button>
                )}
            </div>
            <div>
              <AbuseReportForm commentId={scopedComment.id} pillar={pillar} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
