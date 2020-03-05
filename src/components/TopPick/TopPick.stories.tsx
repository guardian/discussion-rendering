import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { getPicks } from "../../lib/api";
import { Pick } from "./TopPick";
import { CommentType } from "../../types";

export default { component: Pick, title: "TopPick" };

const topPicksStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Default = () => {
  const [picks, setPicks] = useState<CommentType[]>([]);

  useEffect(() => {
    getPicks("/p/39f5z").then(json => {
      setPicks(json);
    });
  }, []);

  return (
    <div
      className={css`
        width: 100%;
        max-width: 620px;
      `}
    >
      <div className={topPicksStyles}>
        {picks.map(pick => (
          <Pick pick={pick} />
        ))}
      </div>
    </div>
  );
};
Default.story = { name: "default" };
