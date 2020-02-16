import React from "react";
import { TopPicks } from "./TopPicks";
import { css } from "emotion";

export default { component: TopPicks, title: "TopPicks" };

export const Default = () => (
  <div
    className={css`
      width: 100%;
      max-width: 620px;
    `}
  >
    <TopPicks shortUrl="/p/39f5z" />
  </div>
);
Default.story = { name: "default" };
