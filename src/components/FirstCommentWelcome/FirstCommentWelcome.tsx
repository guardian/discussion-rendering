import React, { useState, useEffect } from "react";
import { css, cx } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";
import { space, neutral, palette } from "@guardian/src-foundations";
import { Button } from "@guardian/src-button";

import { preview } from "../../lib/api";

const previewStyle = css`
  padding: ${space[2]}px;
  background-color: ${neutral[93]};
  border-radius: 5px;
  margin-bottom: 20px;
  position: relative;
  /* p is returned by API and this is the only way to apply styles */
  p {
    padding-left: 10px;
  }
`;

const inputStyles = css`
  outline: none;
  width: 400px;
  border-radius: 18px;
  padding: 5px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  :focus {
    border-color: ${neutral[46]};
  }
`;

const textStyling = css`
  ${textSans.xsmall()};
`;

const cancelButtonStyles = css`
  margin-left: 20px;
`;

const errorTextStyles = css`
  margin: 0;
  ${textSans.xsmall({ fontWeight: "bold" })};
  color: red;
`;

const imputWrapperStyles = css`
  display: flex;
  flex-direction: column;
`;

export const FirstCommentWelcome = ({
  body,
  error = "",
  submitForm,
  cancelSubmit
}: {
  body: string;
  error?: string;
  submitForm: () => void;
  cancelSubmit: () => void;
}) => {
  const [previewBody, setPreviewBody] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchShowPreview = async () => {
      try {
        const response = await preview(body);
        setPreviewBody(response);
      } catch (e) {
        // TODO: handle errors?
        setPreviewBody("");
      }
    };
    fetchShowPreview();
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submitForm();
      }}
    >
      <div>
        <h3
          className={css`
            ${textSans.medium({ fontWeight: "bold" })};
          `}
        >
          Welcome, you’re about to make your first comment!
        </h3>
      </div>
      <div>
        <p className={textStyling}>
          Before you post, we’d like to thank you for joining the debate - we’re
          glad you’ve chosen to participate and we value your opinions and
          experiences.
        </p>
        <p className={textStyling}>
          Please choose your username under which you would like all your
          comments to show up. You can only set your username once.
        </p>
      </div>
      <div className={cx(imputWrapperStyles, textStyling)}>
        <label>
          <span
            className={css`
              font-weight: bold;
            `}
          >
            Username:{" "}
          </span>
          Must be 6-20 characters, letters and/or numbers only, no spaces.
        </label>
        <input
          className={inputStyles}
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        {error && <p className={errorTextStyles}>{error}</p>}
      </div>
      <p className={textStyling}>
        Please keep your posts respectful and abide by the{" "}
        <a
          className={css`
            color: ${palette.brand[500]};
            text-decoration: none;
            :hover {
              text-decoration: underline;
            }
          `}
          href="/community-standards"
        >
          community guidelines
        </a>
        {` -`} and if you spot a comment you think doesn’t adhere to the
        guidelines, please use the ‘Report’ link next to it to let us know.
      </p>
      <p className={textStyling}>
        Please preview your comment below and click ‘post’ when you’re happy
        with it.
      </p>
      {previewBody && (
        <div
          className={cx(previewStyle, textStyling)}
          dangerouslySetInnerHTML={{ __html: previewBody || "" }}
        />
      )}
      <div>
        <Button size="small" type="submit">
          Post your comment
        </Button>
        <Button
          size="small"
          className={cancelButtonStyles}
          onClick={cancelSubmit}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
