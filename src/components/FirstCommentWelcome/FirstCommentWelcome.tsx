import React, { useState, useEffect } from "react";
import { css } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";
import { space, neutral } from "@guardian/src-foundations";
import { Button } from "@guardian/src-button";
import { TextInput } from "@guardian/src-text-input";

import { preview } from "../../lib/api";

const arrowSize = 15;
const bg = neutral[93];
const previewStyle = css`
  padding: ${space[2]}px;
  background-color: ${bg};
  border-radius: 5px;
  margin-bottom: ${arrowSize + 5}px;
  position: relative;
`;

const textStyling = css`
  ${textSans.small()};
`;

const cancelButtonStyles = css`
  margin-left: 20px;
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
      <div>
        {/* TODO: will need to update lib to make sure label defaults to bold */}
        <TextInput
          label="Username:"
          supporting="Must be 6-20 characters, letters and/or numbers
            only, no spaces."
          error={error ? error : ""}
          optional={false}
          width={30}
        />
        {/* {error && <p className={errorTextStyles}>{error}</p>} */}
      </div>
      <p className={textStyling}>
        Please keep your posts respectful and abide by the{" "}
        <a
          className={css`
            text-decoration: none;
            :hover {
              text-decoration: underline;
            }
          `}
          href="/community-standards"
        >
          community guidelines
        </a>
        - and if you spot a comment you think doesn’t adhere to the guidelines,
        please use the ‘Report’ link next to it to let us know.
      </p>
      <p className={textStyling}>
        Please preview your comment below and click ‘post’ when you’re happy
        with it.
      </p>
      {previewBody && (
        <p
          className={previewStyle}
          dangerouslySetInnerHTML={{ __html: previewBody || "" }}
        />
      )}
      <div>
        <Button type="submit">Post your comment</Button>
        <Button onClick={cancelSubmit} className={cancelButtonStyles}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
