import React from "react";
import { css } from "emotion";

import { TopPick } from "../TopPick/TopPick";
import { comment, commentWithShortBody } from "../../fixtures/comment";

export default { component: TopPick, title: "TopPick" };

export const LongPick = () => (
  <div
    className={css`
      width: 100%;
      max-width: 300px;
    `}
  >
    <TopPick
      baseUrl="https://discussion.guardianapis.com/discussion-api"
      comment={comment}
    />
  </div>
);
LongPick.story = { name: "Long" };

export const ShortPick = () => (
  <div
    className={css`
      width: 100%;
      max-width: 300px;
    `}
  >
    <TopPick
      baseUrl="https://discussion.guardianapis.com/discussion-api"
      comment={commentWithShortBody}
    />
  </div>
);
ShortPick.story = { name: "Short" };
