import React, { useState } from "react";
import { css, cx } from "emotion";

import { textSans } from "@guardian/src-foundations/typography";
import { neutral, space, palette } from "@guardian/src-foundations";

import { Pillar, CommentType } from "../../types";

const commentControlsButton = (pillar: Pillar) => css`
  font-weight: bold;
  margin-right: ${space[2]}px;
  color: ${palette[pillar][400]};
  border: 0;
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
  ${textSans.small()};
  padding: 5px;
  margin-right: 10px;
`;

const replyPreviewHeaderStyle = css`
  margin-top: 0px;
  margin-bottom: 6px;
  font-weight: bold;
`;

const arrowSize = 15;
const bg = neutral[93];
const previewStyle = css`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${bg};
  margin-top: 6px;
  margin-bottom: ${arrowSize + 5}px;
  position: relative;
  display: flex;
  flex-direction: column;
  :before {
    content: "";
    position: absolute;
    border-left: ${arrowSize}px solid #ededed;
    border-top: ${arrowSize}px solid transparent;
    top: -${arrowSize - 1}px;
    margin-left: 60px;
  }
`;

const commentStyles = css`
  p {
    margin-top: 0px;
    margin-bottom: ${space[3]}px;
  }
`;

const hideCommentButtonStyles = css`
  padding-top: 5px;
  padding-bottom: 5px;
  ${textSans.xsmall()};
  :hover {
    cursor: pointer;
  }
`;
const previewHideCommentButtonStyles = css`
  background-color: inherit;
`;

const ReplyArrow = () => (
  <svg width="18" height="18">
    <path d="M10.1 5l.9-1 4 4.5v1L11 14l-.9-1 2.5-3H4L3 9V6.5h2V8h7.6l-2.5-3z"></path>
  </svg>
);

export const CommentReplyPreview = ({
  commentBeingRepliedTo,
  pillar
}: {
  commentBeingRepliedTo: CommentType;
  pillar: Pillar;
}) => {
  const commentControlsButtonStyles = commentControlsButton(pillar);
  const [displayReplyComment, setDisplayReplyComment] = useState<boolean>(
    false
  );
  return (
    <>
      <div className={replyWrapperStyles}>
        <div className={replyArrowStyles}>
          <ReplyArrow />
        </div>
        <div className={replyDisplayNameStyles}>
          {commentBeingRepliedTo.userProfile.displayName}
        </div>
        <span
          className={cx(hideCommentButtonStyles, commentControlsButtonStyles)}
          onClick={() => setDisplayReplyComment(!displayReplyComment)}
        >
          {displayReplyComment ? "Hide Comment" : "Show comment"}
        </span>
      </div>
      {displayReplyComment && (
        <Preview
          pillar={pillar}
          commentBeingRepliedTo={commentBeingRepliedTo}
          setDisplayReplyComment={setDisplayReplyComment}
          displayReplyComment={displayReplyComment}
        />
      )}
    </>
  );
};

export const Preview = ({
  commentBeingRepliedTo,
  pillar,
  setDisplayReplyComment,
  displayReplyComment
}: {
  commentBeingRepliedTo: CommentType;
  pillar: Pillar;
  setDisplayReplyComment: (displayReplyComment: boolean) => void;
  displayReplyComment: boolean;
}) => {
  const commentControlsButtonStyles = commentControlsButton(pillar);
  return (
    <div className={previewStyle}>
      <p className={replyPreviewHeaderStyle}>
        {commentBeingRepliedTo.userProfile.displayName} @{" "}
        {commentBeingRepliedTo.date} said:
      </p>
      <div
        className={commentStyles}
        dangerouslySetInnerHTML={{
          __html: commentBeingRepliedTo.body || ""
        }}
      />
      <div>
        <span
          className={cx(
            hideCommentButtonStyles,
            commentControlsButtonStyles,
            previewHideCommentButtonStyles
          )}
          onClick={() => setDisplayReplyComment(!displayReplyComment)}
        >
          {displayReplyComment ? "Hide Comment" : "Show comment"}
        </span>
      </div>
    </div>
  );
};
