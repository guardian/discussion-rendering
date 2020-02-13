import React from "react";
import { css } from "emotion";

import { Comment as CommentModel } from "../../lib/api";
// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

type Props = {
  comments?: CommentModel[];
};

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;

export const CommentList = ({ comments }: Props) => {
  return (
    <div className={containerStyles}>{`Comments: ${JSON.stringify(
      comments
    )}`}</div>
  );
};
