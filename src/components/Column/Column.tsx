import React from "react";
import { css, cx } from "emotion";

const flexColumnStyles = css`
  display: flex;
  flex-direction: column;
`;

export const Column = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cx(flexColumnStyles, className)}>{children}</div>;
