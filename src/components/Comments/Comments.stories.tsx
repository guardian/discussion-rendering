import React from "react";
import { Comments } from "./Comments";
import { css } from "emotion";

import { mockSignIn } from "../../lib/mockSignIn";

export default { component: Comments, title: "Comments" };

mockSignIn();

export const Default = () => (
  <div
    className={css`
      width: 100%;
      max-width: 620px;
    `}
  >
    <Comments shortUrl="/p/39f5z" />
  </div>
);
Default.story = { name: "default" };
