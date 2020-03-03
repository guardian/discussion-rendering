import React, { useState, useRef } from "react";
import { css, cx } from "emotion";

import { Button } from "@guardian/src-button";
import { palette, space, neutral } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { comment, reply, preview, addUserName } from "../../lib/api";
import { CommentResponse, UserProfile, CommentType } from "../../types";

import { FirstCommentWelcome } from "../FirstCommentWelcome/FirstCommentWelcome";

type Props = {
  shortUrl: string;
  user: UserProfile;
  onAddComment: (commentId: number, body: string, user: UserProfile) => void;
  setCommentBeingRepliedTo?: () => void;
  commentBeingRepliedTo?: CommentType;
};

const boldString = (text: string) => `<b>${text}</b>`;
const italicsString = (text: string) => `<i>${text}</i>`;
const quoteString = (text: string) => `<blockquote>${text}</blockquote>`;
const linkStringFunc = (url: string, highlightedText?: string) =>
  `<a href="${url}">${highlightedText ? highlightedText : url}</a>`;

const formWrapper = css`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${space[5]}px;
`;

const commentTextArea = css`
  width: 100%;
  margin-bottom: ${space[3]}px;
  padding: 8px 10px 10px 8px;
  ${textSans.small()};
  border-color: ${palette.neutral[86]};
  :focus {
    border-color: ${palette.neutral[46]};
    outline: none;
  }
`;

const placeholderCommentStyles = css`
  ::placeholder {
    font-weight: bold;
    color: black;
  }
`;
const placeholderReplyStyles = css`
  ::placeholder {
    color: grey;
  }
`;

const arrowSize = 15;
const bg = neutral[93];
const previewStyle = css`
  padding: ${space[2]}px;
  background-color: ${bg};
  border-radius: 5px;
  margin-bottom: ${arrowSize + 5}px;
  position: relative;

  :before {
    content: "";
    position: absolute;
    border-right: ${arrowSize}px solid transparent;
    border-top: ${arrowSize}px solid ${bg};
    bottom: -${arrowSize - 1}px;
  }
`;

const buttonContainerStyles = css`
  button {
    margin: 5px;
  }
`;

const headerTextStyles = css`
  margin: 0;
  ${textSans.xsmall()};
`;

const errorTextStyles = css`
  margin: 0;
  ${textSans.xsmall()};
  color: red;
`;

const errorContainerStyles = css`
  margin-top: 8px;
`;

const wrapperHeaderTextStyles = css`
  background-color: #f6f6f6;
  padding: 8px 10px 10px 8px;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 2px;
`;

const commentAddOns = css`
  height: 22px;
  font-size: 13px;
  line-height: 17px;
  border: 1px solid ${palette.neutral[100]};
  color: #767676;
  text-align: center;
  cursor: pointer;
  margin-left: 4px;
  padding: 2px 5px 0px 5px;
  min-width: 11px;
  line-height: 17px;
  list-style-type: none;
`;

const addOnsContainer = css`
  display: flex;
  flex-direction: row;
`;

const bottomContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: space-between;
`;

export const CommentForm = ({
  shortUrl,
  onAddComment,
  user,
  setCommentBeingRepliedTo,
  commentBeingRepliedTo
}: Props) => {
  const [isActive, setIsActive] = useState<boolean>(
    commentBeingRepliedTo ? true : false
  );
  const [userNameMissing, setUserNameMissing] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [previewBody, setPreviewBody] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const getHighlightedString = ():
    | {
        highlightedString: string;
        startString: string;
        endString: string;
      }
    | undefined => {
    if (!textAreaRef || !textAreaRef.current) return;
    const selectionStart = textAreaRef.current.selectionStart;
    const selectionEnd = textAreaRef.current.selectionEnd;
    const value = textAreaRef.current.value;

    const startString = value.substring(0, selectionStart);
    const highlightedString = value.substring(selectionStart, selectionEnd);
    const endString = value.substring(selectionEnd, value.length);
    return { startString, highlightedString, endString };
  };

  const transformText = (
    transfromFunc: (highlightedString: string) => string
  ) => {
    const textAreaStrings = getHighlightedString();
    if (!textAreaStrings) return;
    const { startString, highlightedString, endString } = textAreaStrings;
    setBody(startString.concat(transfromFunc(highlightedString), endString));
  };

  const transformLink = () => {
    const url = prompt("Your URL:", "http://www.");
    if (url === null) return;
    const textAreaStrings = getHighlightedString();
    if (!textAreaStrings) return;
    const { startString, highlightedString, endString } = textAreaStrings;
    setBody(
      startString.concat(linkStringFunc(url, highlightedString), endString)
    );
  };

  const fetchShowPreview = async () => {
    // TODO: add error management
    if (!body) return;

    try {
      const response = await preview(body);
      setPreviewBody(response);
      setShowPreview(true);
    } catch (e) {
      setError("Preview request failed, please try again");
      setPreviewBody("");
      setShowPreview(false);
    }
  };

  const resetForm = () => {
    setError("");
    setBody("");
    setShowPreview(false);
    setIsActive(false);
    setCommentBeingRepliedTo && setCommentBeingRepliedTo();
  };

  const submitForm = async () => {
    if (body) {
      const response: CommentResponse = commentBeingRepliedTo
        ? await reply(shortUrl, body, commentBeingRepliedTo.id)
        : await comment(shortUrl, body);
      if (response.statusCode === 420) {
        setError(
          "You can only post one comment every minute. Please try again in a moment."
        );
      } else if (response.message === "USERNAME_MISSING") {
        // Reader has never posted before and needs to choose a username
        setUserNameMissing(true);
      } else if (response.status === "ok") {
        // response.message is the id of the comment that was created on the server
        onAddComment(parseInt(response.message), body, user);
        resetForm();
      } else {
        setError(
          response.message ? response.message : "Comment was unable to submit"
        );
      }
    }
  };

  const submitUserName = async (userName: string) => {
    setError("");
    if (!userName) {
      setError("Username field cannot be empty");
      return;
    }

    const response = await addUserName(userName);
    if (response.status === "ok") {
      // If we are able to submit userName we should continue with submitting comment
      submitForm();
      setUserNameMissing(false);
    } else {
      response.errors && setError(response.errors[0].message);
    }
  };

  if (userNameMissing && body) {
    return (
      <FirstCommentWelcome
        body={body}
        error={error}
        submitForm={submitUserName}
        cancelSubmit={() => setUserNameMissing(false)}
      />
    );
  }

  return (
    <>
      <form
        className={formWrapper}
        onSubmit={e => {
          e.preventDefault();
          submitForm();
        }}
      >
        {error && (
          <div className={errorContainerStyles}>
            <p className={errorTextStyles}>{error}</p>
          </div>
        )}
        {isActive && (
          <div className={wrapperHeaderTextStyles}>
            <p className={headerTextStyles}>
              Please keep comments respectful and abide by the{" "}
              <a href="/community-standards">community guidelines</a>.
            </p>
          </div>
        )}
        <textarea
          placeholder={"Join the discussion"}
          className={cx(
            commentTextArea,
            commentBeingRepliedTo
              ? placeholderReplyStyles
              : placeholderCommentStyles
          )}
          ref={textAreaRef}
          style={{ height: isActive ? "132px" : "50px" }}
          onChange={e => {
            setBody(e.target.value || "");
          }}
          value={body}
          onFocus={() => setIsActive(true)}
        />
        <div className={bottomContainer}>
          <div className={buttonContainerStyles}>
            <Button type="submit" size="small">
              Post your comment
            </Button>
            {(isActive || body) && (
              <>
                <Button
                  size="small"
                  onClick={fetchShowPreview}
                  priority="secondary"
                >
                  Preview
                </Button>
                <Button size="small" onClick={resetForm} priority="tertiary">
                  Cancel
                </Button>
              </>
            )}
          </div>
          {isActive && (
            <div className={addOnsContainer}>
              <button
                onClick={e => {
                  e.preventDefault();
                  transformText(boldString);
                }}
                className={commentAddOns}
              >
                B
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  transformText(italicsString);
                }}
                className={commentAddOns}
              >
                i
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  transformText(quoteString);
                }}
                className={commentAddOns}
              >
                "
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  transformLink();
                }}
                className={commentAddOns}
              >
                Link
              </button>
            </div>
          )}
        </div>
      </form>

      {showPreview && (
        <p
          className={previewStyle}
          dangerouslySetInnerHTML={{ __html: previewBody || "" }}
        />
      )}
    </>
  );
};
