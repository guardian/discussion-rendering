import React from "react";
import { css } from "emotion";
// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

type Props = {
  pages: number[];
  selectedpage: number;
  onChange: () => void;
};

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;

export const Pagination = () => {
  return <div className={containerStyles}>Pagination</div>;
};
