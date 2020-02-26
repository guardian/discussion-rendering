import React, { useState } from "react";
import { css, cx } from "emotion";

import { neutral, space, palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { Pillar, CommentType, UserProfile } from "../../types";
import { GuardianStaff, GuardianPick } from "../Badges/Badges";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { AbuseReportForm } from "../AbuseReportForm/AbuseReportForm";
import { Timestamp } from "../Timestamp/Timestamp";
import { CommentForm } from "../CommentForm/CommentForm";

const ReplyArrow = () => (
  <svg width="18" height="18">
    <path d="M10.1 5l.9-1 4 4.5v1L11 14l-.9-1 2.5-3H4L3 9V6.5h2V8h7.6l-2.5-3z"></path>
  </svg>
);
type Props = {
  comment: CommentType;
  pillar: Pillar;
  shortUrl?: string;
  user?: UserProfile;
  onAddComment?: (commentId: number, body: string, user: UserProfile) => void;
  displayReplyForm?: () => void;
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

const replyWrapperStyles = css`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;
const replyArrowStyles = css`
  fill: grey;
  padding: 5px;
`;

const replyDisplayNameStyles = css`
  ${textSans.xsmall()};
  padding: 5px;
  margin-right: 10px;
`;

const replyPreviewHeaderStyle = css`
  font-weight: bold;
  margin: 0;
`;

const arrowSize = 15;
const bg = neutral[93];
const previewStyle = css`
  padding: ${space[2]}px;
  background-color: ${bg};
  border-radius: 5px;
  margin-bottom: ${arrowSize + 5}px;
  position: relative;

  display: flex;
  flex-direction: column;

  :before {
    content: "";
    position: absolute;
    border-right: ${arrowSize}px solid transparent;
    border-top: ${arrowSize}px solid ${bg};
    bottom: -${arrowSize - 1}px;
  }
`;

const hideCommentButtonStyles = css`
  padding: 5px;
  ${textSans.xsmall()};
  :hover {
    cursor: pointer;
  }
`;
const previewHideCommentButtonStyles = css`
  background-color: inherit;
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
  onAddComment,
  user,
  shortUrl,
  displayReplyForm: parentDisplayReplyForm
}: Props) => {
  // We make the assumption this is a nested comment if displayReplyForm is defined
  const isNestedReplyComment = !!parentDisplayReplyForm;

  const [replyFormIsActive, setReplyFormIsActive] = useState<boolean>(true);
  const [replyComment, setReplyComment] = useState<CommentType>(comment);
  const displayReplyForm = () => setReplyFormIsActive(true);
  const hideReplyForm = () => setReplyFormIsActive(false);

  const [displayReplyComment, setDisplayReplyComment] = useState<boolean>(
    false
  );

  const displayCurrentReplyForm = () => {
    setReplyComment(comment);
    displayReplyForm();
  };

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
                    linkTo={`https://discussion.theguardian.com/comment-permalink/${comment.id}`}
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
                onClick={
                  isNestedReplyComment
                    ? parentDisplayReplyForm
                    : displayCurrentReplyForm
                }
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
      {!isNestedReplyComment && (
        <>
          {comment.responses && (
            <div className={nestingStyles}>
              {comment.responses.map(comment => (
                <Comment
                  comment={comment}
                  pillar={pillar}
                  displayReplyForm={() => {
                    setReplyComment(comment);
                    displayReplyForm();
                  }}
                />
              ))}
            </div>
          )}
          {replyFormIsActive && user && shortUrl && onAddComment && (
            <div className={nestingStyles}>
              <div className={replyWrapperStyles}>
                <div className={replyArrowStyles}>
                  <ReplyArrow />
                </div>
                <div className={replyDisplayNameStyles}>
                  {replyComment.userProfile.displayName}
                </div>
                <button
                  className={cx(
                    hideCommentButtonStyles,
                    commentControlsButtonStyles
                  )}
                  onClick={() => setDisplayReplyComment(!displayReplyComment)}
                >
                  {displayReplyComment ? "Hide Comment" : "Show comment"}
                </button>
              </div>
              {displayReplyComment && (
                <div className={previewStyle}>
                  <p className={replyPreviewHeaderStyle}>
                    {replyComment.userProfile.displayName} @ {replyComment.date}{" "}
                    said:
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: replyComment.body || ""
                    }}
                  />
                  <div>
                    <button
                      className={cx(
                        hideCommentButtonStyles,
                        commentControlsButtonStyles,
                        previewHideCommentButtonStyles
                      )}
                      onClick={() =>
                        setDisplayReplyComment(!displayReplyComment)
                      }
                    >
                      {displayReplyComment ? "Hide Comment" : "Show comment"}
                    </button>
                  </div>
                </div>
              )}
              <CommentForm
                shortUrl={shortUrl}
                onAddComment={onAddComment}
                user={user}
                hideReplyForm={hideReplyForm}
                replyComment={replyComment}
                defaultToActive={true}
              />
            </div>
          )}
        </>
      )}
    </li>
  );
};
