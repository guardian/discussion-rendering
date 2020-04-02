import React, { useState, useEffect } from "react";
import { css, cx } from "emotion";
import { textSans, headline } from "@guardian/src-foundations/typography";
import { space, neutral, palette } from "@guardian/src-foundations";
import { TextInput } from "@guardian/src-text-input";
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

const textStyling = css`
  ${textSans.small()};
`;

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const FirstCommentWelcome = ({
  body,
  error = "",
  submitForm,
  cancelSubmit
}: {
  body: string;
  error?: string;
  submitForm: (userName: string) => void;
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
  }, [body]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submitForm(userName);
      }}
    >
      <h3
        className={css`
          ${headline.xxsmall({ fontWeight: "bold" })};
        `}
      >
        Welcome, you’re about to make your first comment!
      </h3>
      <p className={textStyling}>
        Before you post, we’d like to thank you for joining the debate - we’re
        glad you’ve chosen to participate and we value your opinions and
        experiences.
      </p>
      <p className={textStyling}>
        Please choose your username under which you would like all your comments
        to show up. You can only set your username once.
      </p>
      <TextInput
        label="Username:"
        supporting="Must be 6-20 characters, letters and/or numbers only, no spaces."
        value={userName}
        onChange={e => setUserName(e.target.value)}
        width={30}
        error={error}
      />
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
      <div className={flexRow}>
        <Button size="small" onClick={() => submitForm(userName)}>
          Post your comment
        </Button>
        <div
          className={css`
            margin-left: 20px;
          `}
        >
          <Button size="small" priority="tertiary" onClick={cancelSubmit}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
