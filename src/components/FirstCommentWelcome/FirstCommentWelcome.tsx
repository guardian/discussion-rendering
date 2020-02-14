import React from "react";
import { css } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";

export const FirstCommentWelcome = () => {
  return (
    <>
      <div>
        <h3
          className={css`
            ${textSans.small()};
            font-weight: bold;
          `}
        >
          Welcome William Lacroix, you’re about to make your first comment!
        </h3>
      </div>
      <div>
        <p>
          Welcome William Lacroix, you’re about to make your first comment!
          Before you post, we’d like to thank you for joining the debate - we’re
          glad you’ve chosen to participate and we value your opinions and
          experiences. Please choose your username under which you would like
          all your comments to show up. You can only set your username once.
        </p>
      </div>
      <div>
        Username: Must be 6-20 characters, letters and/or numbers only, no
        spaces.
        <input />
      </div>
      <div>
        Please keep your posts respectful and abide by the community guidelines
        - and if you spot a comment you think doesn’t adhere to the guidelines,
        please use the ‘Report’ link next to it to let us know. Please preview
        your comment below and click ‘post’ when you’re happy with it.
      </div>
      {/* ADD previewed comment */}
      {/* ADD - Post your comment  && Cancel -- buttons */}
    </>
  );
};
