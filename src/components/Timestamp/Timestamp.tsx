import React from "react";
import { css } from "emotion";
// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

type Props = {
  date: Date;
  permalink: string;
};

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;

export const Timestamp = () => {
  return <div className={containerStyles}>Timestamp</div>;
};
