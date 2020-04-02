import React, { useState } from "react";
import { css, cx } from "emotion";

import { textSans } from "@guardian/src-foundations/typography";
import { neutral, space, brand } from "@guardian/src-foundations";

import { CommentType } from "../../types";

const commentControlsButtonStyles = css`
  ${textSans.small()};
  margin-right: ${space[2]}px;
  color: ${brand[500]};
  border: 0;
`;

const replyWrapperStyles = css`
  padding-top: ${space[1]}px;
  padding-bottom: ${space[1]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const replyArrowStyles = css`
  fill: grey;
  /*
    In order to get teh arrow SVG alinged correctly with the text reply text
    we need to add 2px padding
  */
  padding-top: 2px;
`;

const replyDisplayNameStyles = css`
  ${textSans.small()};
  padding-top: ${space[1]}px;
  padding-bottom: ${space[1]}px;
  padding-right: ${space[1]}px;
  margin-right: ${space[2]}px;
`;

const replyPreviewHeaderStyle = css`
  ${textSans.small({ fontWeight: "bold" })};
  margin-top: 0px;
  margin-bottom: 6px;
`;

const arrowSize = 15;
const bg = neutral[93];
const previewStyle = css`
  padding-top: ${space[3]}px;
  padding-bottom: ${space[3]}px;
  padding-left: ${space[5]}px;
  padding-right: ${space[5]}px;
  background-color: ${bg};
  margin-top: ${arrowSize}px;
  margin-bottom: ${arrowSize + 5}px;
  position: relative;
  display: flex;
  flex-direction: column;
  :before {
    content: "";
    position: absolute;
    border-left: ${arrowSize}px solid ${bg};
    border-top: ${arrowSize}px solid transparent;
    top: -${arrowSize - 1}px;
    margin-left: 60px;
  }
`;

const commentStyles = css`
  p {
    ${textSans.small()};
    margin-top: 0px;
    margin-bottom: ${space[3]}px;
  }
`;

const hideCommentButtonStyles = css`
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
  commentBeingRepliedTo
}: {
  commentBeingRepliedTo: CommentType;
}) => {
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
  setDisplayReplyComment,
  displayReplyComment
}: {
  commentBeingRepliedTo: CommentType;
  setDisplayReplyComment: (displayReplyComment: boolean) => void;
  displayReplyComment: boolean;
}) => {
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
        <button
          className={cx(
            hideCommentButtonStyles,
            commentControlsButtonStyles,
            previewHideCommentButtonStyles
          )}
          onClick={() => setDisplayReplyComment(!displayReplyComment)}
        >
          {displayReplyComment ? "Hide Comment" : "Show comment"}
        </button>
      </div>
    </div>
  );
};
