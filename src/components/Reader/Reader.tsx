import React from "react";
import { css } from "emotion";
// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

type Props = {
  //   commentId: number;
};

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;

export const Reader = () => {
  return <div className={containerStyles}>Reader</div>;
};
