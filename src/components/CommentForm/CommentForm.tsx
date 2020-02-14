import React, { useState } from "react";
import { css } from "emotion";
import { Button } from "@guardian/src-button";
import { space, neutral } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { comment, preview } from "../../lib/api";

type Props = { shortUrl: string };

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
const wrapperHeaderTextStyles = css`
  background-color: #f6f6f6;
  padding: 8px 10px 10px 8px;
  width: 100%;
`;

export const CommentForm = ({ shortUrl }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [body, updateBody] = useState("");
  const [previewBody, updatePreviewBody] = useState("");
  const [showPreview, updateShowPreview] = useState(false);

  const fetchShowPreview = async () => {
    // TODO: add error management
    if (!body) return;

    try {
      const response = await preview(body);
      updatePreviewBody(response);
      updateShowPreview(true);
    } catch (e) {
      // TODO: add error management
      console.error(`Preview call failed: ${e}`);
      updatePreviewBody("");
      updateShowPreview(false);
    }
  };

  const submitForm = async () => {
    if (body) {
      await comment(shortUrl, body);
      updateBody("");
      updateShowPreview(false);
      // TODO: used HTTP code and support error message
    } else {
      // TODO: add error management
    }
  };

  return (
    <>
      <form
        className={formWrapper}
        onSubmit={e => {
          e.preventDefault();
          submitForm();
        }}
      >
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
            updateBody(e.target.value || "");
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
                    updateShowPreview(false);
                    updateBody("");
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
