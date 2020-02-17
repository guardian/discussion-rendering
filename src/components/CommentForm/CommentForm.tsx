import React, { useState } from "react";
import { css } from "emotion";
import { Button } from "@guardian/src-button";
import { space, neutral } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { comment, preview } from "../../lib/api";

import { CommentResponse, UserProfile } from "../../types";

import { FirstCommentWelcome } from "../FirstCommentWelcome/FirstCommentWelcome";

type Props = {
  shortUrl: string;
  user: UserProfile;
  onAdd: (commentId: number, body: string, user: UserProfile) => void;
};

const formWrapper = css`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${space[5]}px;
`;

const commentTextArea = css`
  width: 100%;
  min-height: 120px;
  margin-bottom: ${space[3]}px;
  padding: 8px 10px 10px 8px;
  ${textSans.small()};
  ::placeholder {
    font-weight: bold;
    color: black;
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
`;

export const CommentForm = ({ shortUrl, onAdd, user }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [firstPost, setFirstPost] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [previewBody, setPreviewBody] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);

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

  const submitForm = async () => {
    if (body) {
      const response: CommentResponse = await comment(shortUrl, body);
      if (response.statusCode === 420) {
        setError(
          "You can only post one comment every minute. Please try again in a moment."
        );
      } else if (response.message === "USERNAME_MISSING") {
        // Reader has never posted before and needs to choose a username
        setFirstPost(true);
      } else if (response.status === "ok")
        // response.message is the id of the comment that was created on the server
        onAdd(parseInt(response.message), body, user);
    }
  };

  const resetForm = () => {
    setError("");
    setBody("");
    setShowPreview(false);
  };

  if (firstPost) {
    return <FirstCommentWelcome />;
  }

  return (
    <>
      <form
        className={formWrapper}
        onSubmit={e => {
          e.preventDefault();
          resetForm();
          submitForm();
        }}
      >
        {error && (
          <div className={errorContainerStyles}>
            <p className={errorTextStyles}>{error}</p>
          </div>
        )}
        <div className={wrapperHeaderTextStyles}>
          <p className={headerTextStyles}>
            Please keep comments respectful and abide by the{" "}
            <a href="/community-standards">community guidelines</a>.
          </p>
        </div>
        <textarea
          placeholder={!isActive ? "Join the discussion" : ""}
          className={commentTextArea}
          onChange={e => {
            setBody(e.target.value || "");
          }}
          value={body}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
        <div>
          <div className={buttonContainerStyles}>
            <Button type="submit" size="small">
              Post your comment
            </Button>
            {(isActive || body) && (
              <>
                <Button size="small" onClick={fetchShowPreview}>
                  Preview
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
          {/* <div>
            <ul>
              <li>B</li>
              <li>i</li>
              <li>"</li>
              <li>Link</li>
            </ul>
          </div> */}
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
