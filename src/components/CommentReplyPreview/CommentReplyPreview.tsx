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
  ${textSans.small({ fontWeight: "bold" })};
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
        <div className={previewStyle}>
          <p className={replyPreviewHeaderStyle}>
            {commentBeingRepliedTo.userProfile.displayName} @{" "}
            {commentBeingRepliedTo.date} said:
          </p>
          <p
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
      )}
    </>
  );
};
