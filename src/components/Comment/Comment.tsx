import React, { useState } from "react";
import { css, cx } from "emotion";

import { space, palette } from "@guardian/src-foundations";
import { neutral, background, border } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";

import { GuardianStaff, GuardianPick } from "../Badges/Badges";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { AbuseReportForm } from "../AbuseReportForm/AbuseReportForm";
import { Timestamp } from "../Timestamp/Timestamp";
import { Avatar } from "../Avatar/Avatar";

import { Pillar, CommentType, UserProfile } from "../../types";
import { pickComment, unPickComment } from "../../lib/api";
import { joinUrl } from "../../lib/joinUrl";

type Props = {
  baseUrl: string;
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
  ${textSans.xsmall({ fontWeight: "bold" })}
  margin-right: ${space[2]}px;
  color: ${palette[pillar][400]};
  background-color: ${background.primary};
  border: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline
  }
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

const blockedCommentStyles = css`
  color: ${neutral[60]};
  ${textSans.xsmall()}
`;

// to override a tag styles from dangerouslySetInnerHTML
const commentLinkStyling = css`
  a {
    color: ${palette.brand[500]};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

const commentWrapper = css`
  border-top: 1px solid ${border.secondary};
  display: flex;
  padding: ${space[2]}px 0;
`;

const avatarMargin = css`
  margin-right: ${space[2]}px;
`;

const commentProfileName = (pillar: Pillar) => css`
  margin-top: 0;
  color: ${palette[pillar][400]};
  ${textSans.small({ fontWeight: "bold" })}
`;

const commentDetails = css`
  flex-grow: 1;
`;

const iconWrapper = css`
  padding: 2px;
  white-space: nowrap;
`;

// const timestampWrapperStyles = css`
//   margin-left: 10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

const linkStyles = css`
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const flexRowStyles = css`
  display: flex;
  flex-direction: row;
`;

const flexColStyles = css`
  display: flex;
  flex-direction: row;
`;

const spaceBetweenStyles = css`
    width: 100%;
    align-items: space-between;
`

const removePaddingLeft = css`
  padding-left: 0px;
`;

const ReplyArrow = () => (
  <svg
    width="18"
    height="18"
    className={css`
      fill: ${neutral[46]};
    `}
  >
    <path d="M10.1 5l.9-1 4 4.5v1L11 14l-.9-1 2.5-3H4L3 9V6.5h2V8h7.6l-2.5-3z"></path>
  </svg>
);

const ProfilName = ({ pillar, userId, displayName }: { pillar: Pillar, userId: string, displayName: string }) => (
  <div className={commentProfileName(pillar)}>
    <a
      href={joinUrl(["https://profile.theguardian.com/user", userId])}
      className={linkStyles}
    >
      {displayName}
    </a>
  </div>
)

const Badges = ({ comment, isHighlighted }: { comment: CommentType, isHighlighted: boolean }) => (
  <>
    <>
      {!!comment.userProfile.badge.filter(
        obj => obj["name"] === "Staff"
      ).length && (
          <div className={iconWrapper}>
            <GuardianStaff />
          </div>
        )}
    </>
    <>
      {comment.status !== "blocked" && isHighlighted && (
        <div className={iconWrapper}>
          <GuardianPick />
        </div>
      )}
    </>
  </>
)

const CommentMessage = ({
  comment,
  pillar,
  setCommentBeingRepliedTo,
  user,
  isHighlighted,
  setIsHighlighted,
  setError
}: {
  comment: CommentType,
  pillar: Pillar,
  setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void,
  user?: UserProfile,
  isHighlighted: boolean,
  setIsHighlighted: (isHighlighted: boolean) => void,
  setError: (errorMessage: string) => void
}) => {
  const commentControlsButtonStyles = commentControlsButton(pillar);

  const pick = async () => {
    setError("");
    const response = await pickComment(comment.id);
    if (response.status === "error") {
      setError(response.message);
    } else {
      setIsHighlighted(true);
    }
  };

  const unPick = async () => {
    setError("");
    const response = await unPickComment(comment.id);
    if (response.status === "error") {
      setError(response.message);
    } else {
      setIsHighlighted(false);
    }
  };

  return (
    <>
      {comment.status !== "blocked" ? (
        <>
          <div
            className={cx(commentCss, commentLinkStyling)}
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
          <div className={spaceBetween}>
            <div className={commentControls}>
              <button
                onClick={() => setCommentBeingRepliedTo(comment)}
                className={cx(
                  commentControlsButtonStyles,
                  removePaddingLeft
                )}
              >
                <div className={flexRowStyles}>
                  <ReplyArrow />
                  Reply
              </div>
              </button>
              <button className={commentControlsButtonStyles}>Share</button>
              {/* Only staff can pick, and they cannot pick thier own comment */}
              {user &&
                user.badge.some(e => e.name === "Staff") &&
                user.userId !== comment.userProfile.userId && (
                  <button
                    onClick={isHighlighted ? unPick : pick}
                    className={commentControlsButtonStyles}
                  >
                    {isHighlighted ? "Unpick" : "Pick"}
                  </button>
                )}
            </div>
            <div>
              <AbuseReportForm commentId={comment.id} pillar={pillar} />
            </div>
          </div>
        </>
      ) : (
          <p
            className={cx(blockedCommentStyles, commentLinkStyling)}
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
        )}
    </>
  )
}

export const Comment = ({
  baseUrl,
  comment,
  pillar,
  setCommentBeingRepliedTo,
  user,
  isReply
}: Props) => {
  const [isHighlighted, setIsHighlighted] = useState<boolean>(
    comment.isHighlighted
  );
  const [error, setError] = useState<string>();

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
      <div id={`comment-${comment.id}`} className={commentWrapper}>
        <div className={avatarMargin}>
          <Avatar
            imageUrl={comment.userProfile.avatar}
            displayName={comment.userProfile.displayName}
            size={isReply ? "small" : "medium"}
          />
        </div>

        <div className={commentDetails}>
          <header className={cx(flexRowStyles, spaceBetweenStyles)}>
            <div className={flexColStyles}>
              <div className={flexRowStyles}>
                <ProfilName
                  pillar={pillar}
                  userId={comment.userProfile.userId}
                  displayName={comment.userProfile.displayName}
                />
                <Timestamp
                  isoDateTime={comment.isoDateTime}
                  linkTo={joinUrl([
                    // Remove the discussion-api path from the baseUrl
                    baseUrl
                      .split("/")
                      .filter(path => path !== "discussion-api")
                      .join("/"),
                    "comment-permalink",
                    comment.id.toString()
                  ])}
                />
              </div>
              <div className={flexRowStyles}>
                <Badges comment={comment} isHighlighted={isHighlighted} />
              </div>
            </div>
            <div className={flexColStyles}>
              {comment.status !== "blocked" && (
                <RecommendationCount
                  commentId={comment.id}
                  initialCount={comment.numRecommends}
                  alreadyRecommended={false}
                />
              )}
            </div>
          </header>
          <CommentMessage
            comment={comment}
            pillar={pillar}
            setCommentBeingRepliedTo={setCommentBeingRepliedTo}
            user={user}
            isHighlighted={isHighlighted}
            setIsHighlighted={setIsHighlighted}
            setError={setError}
          />
        </div>
      </div>
    </>
  );
};
