import React from "react";
import { css, cx } from "emotion";

const flexRowStyles = css`
  display: flex;
  flex-direction: row;
`;

export const Row = ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cx(flexRowStyles, className)}>{children}</div>;
