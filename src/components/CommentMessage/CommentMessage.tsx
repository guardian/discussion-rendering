import React from "react";
import { css, cx } from "emotion";

import { space, palette } from "@guardian/src-foundations";
import { neutral, background } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";

import { ReplyArrow } from "../ReplyArrow/ReplyArrow";
import { AbuseReportForm } from "../AbuseReportForm/AbuseReportForm";
import { pickComment, unPickComment } from "../../lib/api";

import { Pillar, CommentType, UserProfile } from "../../types";

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

const commentCss = css`
  ${textSans.small()}
  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const blockedCommentStyles = css`
  color: ${neutral[60]};
  ${textSans.xsmall()}
`;

const spaceBetweenStyles = css`
  display: flex;
  justify-content: space-between;
`;

const removePaddingLeft = css`
  padding-left: 0px;
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

const Row = ({
  children,
  justify = "flex-start",
  fullWidth = false
}: {
  children: React.ReactNode;
  justify?: "flex-start" | "space-between"; // Extend as required
  fullWidth?: boolean;
}) => (
  <div
    className={css`
      display: flex;
      flex-direction: row;
      justify-content: ${justify};
      ${fullWidth} {
        width: 100%;
      }
    `}
  >
    {children}
  </div>
);

export const CommentMessage = ({
  comment,
  pillar,
  setCommentBeingRepliedTo,
  isClosedForComments,
  user,
  isHighlighted,
  setIsHighlighted,
  setError
}: {
  comment: CommentType;
  pillar: Pillar;
  setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void;
  isClosedForComments: boolean;
  user?: UserProfile;
  isHighlighted: boolean;
  setIsHighlighted: (isHighlighted: boolean) => void;
  setError: (errorMessage: string) => void;
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
          <div className={spaceBetweenStyles}>
            <div className={commentControls}>
              {!isClosedForComments && (
                <button
                  onClick={() => setCommentBeingRepliedTo(comment)}
                  className={cx(commentControlsButtonStyles, removePaddingLeft)}
                >
                  <Row>
                    <ReplyArrow />
                    Reply
                  </Row>
                </button>
              )}
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
  );
};
