import React from "react";
import { css, keyframes } from "emotion";

import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";

const BACKGROUND_COLOUR = neutral[93];

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const shimmerStyles = css`
  animation: ${shimmer} 2s infinite linear;
  background: linear-gradient(
    to right,
    ${BACKGROUND_COLOUR} 4%,
    ${neutral[86]} 25%,
    ${BACKGROUND_COLOUR} 36%
  );
  background-size: 1000px 100%;
`;

const containerStyles = css`
  border-bottom: 1px solid ${neutral[86]};
  width: 620px;
  display: flex;
  padding: ${space[2]}px 0;
`;

const avatarStyles = (size: number) => css`
  border-radius: ${size + 10}px;
  width: ${size}px;
  height: ${size}px;
  background-color: ${BACKGROUND_COLOUR};
  margin-right: ${space[2]}px;

  ${shimmerStyles}
`;

const Column = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `}
  >
    {children}
  </div>
);

const Row = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      display: flex;
      flex-direction: row;
    `}
  >
    {children}
  </div>
);

const Grey = ({
  height,
  width,
  spaceBelow,
  spaceLeft
}: {
  height: string;
  width?: string;
  spaceBelow?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
  spaceLeft?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
}) => (
  <div
    className={css`
      height: ${height};
      width: ${width ? width : "100%"};
      margin-bottom: ${spaceBelow && space[spaceBelow]}px;
      margin-left: ${spaceLeft && space[spaceLeft]}px;
      background-color: ${BACKGROUND_COLOUR};

      ${shimmerStyles}
    `}
  />
);

export const LoadingComments = () => (
  <div className={containerStyles}>
    <div className={avatarStyles(48)} />
    <Column>
      <Row>
        <Grey height="20px" width="140px" spaceBelow={9} />
        <Grey height="15px" width="100px" spaceBelow={9} spaceLeft={2} />
      </Row>
      <Grey height="20px" spaceBelow={1} />
      <Grey height="20px" spaceBelow={1} />
      <Grey height="20px" width="200px" spaceBelow={5} />

      <Row>
        <Grey height="15px" width="40px" />
        <Grey height="15px" width="40px" spaceLeft={6} />
      </Row>
    </Column>
  </div>
);
